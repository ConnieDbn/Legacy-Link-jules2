<?php
namespace Jules\Component\LegacyLink\Administrator\Table;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\Table\Table;
use Joomla\Database\DatabaseDriver;

/**
 * Document Table class.
 *
 * This class maps to the #__legacylink_documents table in the database.
 * It provides the ORM-like functionality for creating, reading, updating, and deleting records.
 */
class DocumentTable extends Table
{
    /**
     * Constructor
     *
     * @param   DatabaseDriver  &$db  A database connector object
     */
    public function __construct(DatabaseDriver &$db)
    {
        parent::__construct('#__legacylink_documents', 'id', $db);
    }
}
