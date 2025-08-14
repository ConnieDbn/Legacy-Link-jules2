<?php
namespace Jules\Component\LegacyLink\Site\Model;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Factory;
use Joomla\CMS\Filesystem\File;
use Joomla\CMS\Filesystem\Folder;
use Joomla\CMS\Table\Table;

/**
 * Document Model
 * This model handles the business logic for a single document, including saving and validation.
 */
class DocumentModel extends BaseDatabaseModel
{
    /**
     * Method to get a single document record.
     *
     * @return  object|false  The document object, or false if not found or not authorized.
     */
    public function getItem()
    {
        $id   = Factory::getApplication()->input->getInt('id');
        $user = Factory::getUser();

        if ($id > 0 && !$user->get('guest')) {
            $db = $this->getDbo();
            $query = $db->getQuery(true)
                ->select('*')
                ->from($db->quoteName('#__legacylink_documents'))
                ->where($db->quoteName('id') . ' = ' . (int) $id)
                ->where($db->quoteName('user_id') . ' = ' . (int) $user->id);

            $db->setQuery($query);
            $item = $db->loadObject();

            return $item;
        }

        return false;
    }

    /**
     * Method to save a document record.
     * This includes moving the uploaded file to a secure location and saving its metadata.
     *
     * @param   array  $data  The form data.
     * @param   array  $file  The file information from the $_FILES array.
     *
     * @return  bool|int  The ID of the saved document on success, false on failure.
     */
    public function save($data, $file)
    {
        $user = Factory::getUser();
        if ($user->get('guest')) {
            $this->setError('User not logged in.');
            return false;
        }

        // Basic validation
        if ($file['error'] !== UPLOAD_ERR_OK) {
            $this->setError('An error occurred during file upload.');
            return false;
        }
        if (empty($data['file-title'])) {
            $this->setError('Document title is required.');
            return false;
        }

        // Prepare the storage path. Files are stored in a private media folder.
        // e.g., /media/com_legacylink/files/{user_id}/
        $uploadPath = JPATH_MEDIA . '/com_legacylink/files/' . $user->id;
        if (!Folder::exists($uploadPath)) {
            Folder::create($uploadPath);
        }

        // Sanitize the filename and create the full destination path
        $filename    = File::makeSafe($file['name']);
        $destination = $uploadPath . '/' . $filename;

        // Ensure the filename is unique to prevent overwrites
        if (File::exists($destination)) {
            $this->setError('A file with this name already exists.');
            return false;
        }

        // Move the uploaded file to the destination
        if (!File::upload($file['tmp_name'], $destination)) {
            $this->setError('Failed to move the uploaded file.');
            return false;
        }

        // Prepare data for the database
        $table = Table::getInstance('Document', 'Jules\\Component\\LegacyLink\\Administrator\\Table\\');
        $dbData = [
            'user_id'   => $user->id,
            'title'     => $data['file-title'],
            'filename'  => $filename,
            'filepath'  => str_replace(JPATH_SITE, '', $destination), // Store a relative path
            'filetype'  => $file['type'],
            'filesize'  => $file['size'],
            'asset_id'  => 0 // Asset ID for ACL will be handled later
        ];

        // Bind and save the data
        if (!$table->save($dbData)) {
            // If saving to the DB fails, delete the file to prevent orphaned files
            File::delete($destination);
            $this->setError($table->getError());
            return false;
        }

        return $table->id;
    }
}
