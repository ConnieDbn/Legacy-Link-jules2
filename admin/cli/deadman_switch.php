<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_legacylink
 *
 * A command-line script to check the Dead Man's Switch for all users.
 * This script should be run by a cron job on a regular basis (e.g., once per day).
 */

// Initialize Joomla framework
const _JEXEC = 1;

// Load system defines
if (file_exists(dirname(__DIR__) . '/defines.php')) {
    require_once dirname(__DIR__) . '/defines.php';
}
if (!defined('_JDEFINES')) {
    define('JPATH_BASE', dirname(dirname(dirname(dirname(__DIR__)))) . '/administrator');
    require_once JPATH_BASE . '/includes/defines.php';
}

// Get the framework.
require_once JPATH_LIBRARIES . '/import.legacy.php';
require_once JPATH_LIBRARIES . '/cms.php';

use Joomla\CMS\Factory;
use Joomla\CMS\Date\Date;

/**
 * Dead Man's Switch CLI Application
 */
class DeadManSwitchCli extends \Joomla\CMS\Application\CliApplication
{
    public function doExecute()
    {
        $this->out('Starting Dead Man\'s Switch check...');

        $db = Factory::getDbo();
        $query = $db->getQuery(true)
            ->select('*')
            ->from($db->quoteName('#__legacylink_user_status'));

        $db->setQuery($query);
        $statuses = $db->loadObjectList();

        $now = new Date('now');

        foreach ($statuses as $status) {
            $lastCheckin = new Date($status->last_checkin_at);
            $interval = 'P' . (int) $status->checkin_interval_days . 'D';
            $dueDate = $lastCheckin->add(new DateInterval($interval));

            if ($now > $dueDate) {
                // User is overdue
                $this->out('User ID ' . $status->user_id . ' is overdue.');

                if ($status->status == 0) {
                    // Status is 'active', send first reminder
                    $this->out('--> Status is active. Sending reminder.');

                    // Update status to 'reminder_sent'
                    $status->status = 1;
                    $status->reminder_sent_at = $now->toSql();
                    $db->updateObject('#__legacylink_user_status', $status, 'id');

                    $this->out('--> User status updated to "reminder_sent". An email would be sent here.');
                }
                // TODO: Add logic for status 1 (reminder_sent) to trigger the switch
            }
        }

        $this->out('Dead Man\'s Switch check complete.');
    }
}

\Joomla\CMS\Application\CliApplication::getInstance('DeadManSwitchCli')->execute();
