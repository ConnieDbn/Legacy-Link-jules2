<?php
namespace Jules\Component\LegacyLink\Site\Model;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\Model\BaseDatabaseModel;
use Joomla\CMS\Factory;
use Joomla\CMS\Date\Date;
use stdClass;

/**
 * User Status Model
 * This model handles the business logic for a user's check-in status.
 */
class UserStatusModel extends BaseDatabaseModel
{
    /**
     * Records a check-in for the given user, updating their last_checkin_at timestamp.
     * If no status record exists for the user, it creates one.
     *
     * @param   int  $userId  The ID of the user to check in.
     *
     * @return  bool  True on success, false on failure.
     */
    public function checkin($userId)
    {
        if (!$userId) {
            $this->setError('Invalid user ID.');
            return false;
        }

        $db = $this->getDbo();
        $query = $db->getQuery(true)
            ->select($db->quoteName('id'))
            ->from($db->quoteName('#__legacylink_user_status'))
            ->where($db->quoteName('user_id') . ' = ' . (int) $userId);

        $db->setQuery($query);
        $statusId = $db->loadResult();

        $status = new stdClass();
        $status->user_id         = (int) $userId;
        $status->last_checkin_at = (new Date('now'))->toSql();
        $status->status          = 0; // Reset status to 'active' on any check-in

        try {
            if ($statusId) {
                // Update existing record
                $status->id = $statusId;
                $result = $db->updateObject('#__legacylink_user_status', $status, 'id');
            } else {
                // Insert new record
                $result = $db->insertObject('#__legacylink_user_status', $status, 'id');
            }
        } catch (\Exception $e) {
            $this->setError($e->getMessage());
            return false;
        }

        return true;
    }
}
