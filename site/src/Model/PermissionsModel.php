<?php
namespace Jules\Component\LegacyLink\Site\Model;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Factory;

/**
 * Permissions Model
 * This model handles the business logic for document permissions.
 */
class PermissionsModel extends BaseDatabaseModel
{
    /**
     * Method to get a list of contact IDs that have permission for a specific document.
     *
     * @param   int  $documentId  The ID of the document.
     *
     * @return  array  An array of contact IDs.
     */
    public function getGrantedContactIds($documentId)
    {
        if (!$documentId) {
            return [];
        }

        $db    = $this->getDbo();
        $query = $db->getQuery(true)
            ->select($db->quoteName('contact_id'))
            ->from($db->quoteName('#__legacylink_document_permissions'))
            ->where($db->quoteName('document_id') . ' = ' . (int) $documentId);

        $db->setQuery($query);

        return $db->loadColumn();
    }

    /**
     * Method to save the permissions for a document.
     *
     * @param   array  $data  The form data, containing document_id and an array of contact_ids.
     *
     * @return  bool  True on success, false on failure.
     */
    public function save($data)
    {
        $documentId = (int) $data['document_id'];
        $contactIds = (array) ($data['contacts'] ?? []);

        // First, clear all existing permissions for this document
        $db = $this->getDbo();
        $query = $db->getQuery(true)
            ->delete($db->quoteName('#__legacylink_document_permissions'))
            ->where($db->quoteName('document_id') . ' = ' . $documentId);

        $db->setQuery($query);
        $db->execute();

        // If no contacts were selected, we're done.
        if (empty($contactIds)) {
            return true;
        }

        // Now, insert the new permissions
        $query = $db->getQuery(true)
            ->insert($db->quoteName('#__legacylink_document_permissions'))
            ->columns([$db->quoteName('document_id'), $db->quoteName('contact_id')]);

        foreach ($contactIds as $contactId) {
            $query->values((int) $documentId . ', ' . (int) $contactId);
        }

        $db->setQuery($query);

        try {
            $db->execute();
        } catch (\Exception $e) {
            $this->setError($e->getMessage());
            return false;
        }

        return true;
    }
}
