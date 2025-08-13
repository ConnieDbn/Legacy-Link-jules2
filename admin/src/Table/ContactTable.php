<?php
namespace Jules\Component\LegacyLink\Administrator\Table;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\Table\Table;
use Joomla\Database\DatabaseDriver;

/**
 * Contact Table class.
 *
 * This class maps to the #__legacylink_contacts table in the database.
 */
class ContactTable extends Table
{
    /**
     * Constructor
     *
     * @param   DatabaseDriver  &$db  A database connector object
     */
    public function __construct(DatabaseDriver &$db)
    {
        parent::__construct('#__legacylink_contacts', 'id', $db);
    }
}
