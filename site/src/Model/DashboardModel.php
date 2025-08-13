<?php
namespace Jules\Component\LegacyLink\Site\Model;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Factory;
use stdClass;

/**
 * Dashboard Model
 * This model provides the data for the main user dashboard.
 */
class DashboardModel extends BaseDatabaseModel
{
    /**
     * Method to get the data for the dashboard.
     * In the future, this will be expanded to query the database for user-specific information.
     *
     * @return  object|null An object with data for the view, or null if the user is a guest.
     */
    public function getItem()
    {
        $user = Factory::getUser();

        // Do not return any data for guest users
        if ($user->get('guest')) {
            return null;
        }

        $item = new stdClass();

        $item->greeting = 'Welcome to your Legacy Link Dashboard, ' . htmlspecialchars($user->name, ENT_QUOTES, 'UTF-8') . '!';
        $item->message = 'From here, you can manage your documents, contacts, and settings.';

        // Get the user's documents from the database
        $db = $this->getDbo();
        $query = $db->getQuery(true)
            ->select('id, title, filename, filesize, created_at')
            ->from($db->quoteName('#__legacylink_documents'))
            ->where($db->quoteName('user_id') . ' = ' . (int) $user->id)
            ->order($db->quoteName('created_at') . ' DESC');

        $db->setQuery($query);
        $item->documents = $db->loadObjectList();

        $item->document_count = count($item->documents);

        // TODO: Get contact count
        $item->contact_count = 0;

        // Get user status
        $statusQuery = $db->getQuery(true)
            ->select('last_checkin_at')
            ->from($db->quoteName('#__legacylink_user_status'))
            ->where($db->quoteName('user_id') . ' = ' . (int) $user->id);
        $db->setQuery($statusQuery);
        $item->last_checkin = $db->loadResult();

        return $item;
    }
}
