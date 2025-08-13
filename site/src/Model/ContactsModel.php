<?php
namespace Jules\Component\LegacyLink\Site\Model;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Factory;
use Joomla\CMS\Table\Table;

/**
 * Contacts Model
 * This model provides the data for the contact management page.
 */
class ContactsModel extends BaseDatabaseModel
{
    /**
     * Method to get a list of contacts for the current user.
     *
     * @return  array  An array of contact objects.
     */
    public function getItems()
    {
        $user = Factory::getUser();
        if ($user->get('guest')) {
            return [];
        }

        $db = $this->getDbo();
        $query = $db->getQuery(true)
            ->select('id, name, email, relationship')
            ->from($db->quoteName('#__legacylink_contacts'))
            ->where($db->quoteName('user_id') . ' = ' . (int) $user->id)
            ->order($db->quoteName('name') . ' ASC');

        $db->setQuery($query);
        return $db->loadObjectList();
    }

    /**
     * Method to save a contact.
     *
     * @param   array  $data  The data from the form.
     *
     * @return  bool|int  The ID of the saved record on success, false on failure.
     */
    public function save($data)
    {
        $user = Factory::getUser();
        if ($user->get('guest')) {
            $this->setError('User not logged in.');
            return false;
        }

        // Basic validation
        if (empty($data['name']) || empty($data['email'])) {
            $this->setError('Name and Email are required.');
            return false;
        }

        $table = Table::getInstance('Contact', 'Jules\\Component\\LegacyLink\\Administrator\\Table\\');

        $data['user_id'] = $user->id;

        if (!$table->save($data)) {
            $this->setError($table->getError());
            return false;
        }
        return $table->id;
    }
}
