<?php
namespace Jules\Component\LegacyLink\Site\View\Dashboard;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
use Joomla\CMS\Factory;

/**
 * The HTML view for the Dashboard screen.
 * This class is responsible for displaying the dashboard to logged-in users.
 */
class HtmlView extends BaseHtmlView
{
    /**
     * The data for the view
     *
     * @var object
     */
    public $item;

    /**
     * The user object
     *
     * @var \Joomla\CMS\User\User
     */
    public $user;

    /**
     * Display the view
     *
     * @param   string  $tpl  The name of the template file to parse; automatically determined if not null.
     *
     * @return  void
     */
    public function display($tpl = null)
    {
        $this->user = Factory::getUser();

        // If the user is a guest, they should not be here.
        // Redirect them to the login page with a message.
        if ($this->user->get('guest')) {
            $app = Factory::getApplication();
            $app->enqueueMessage('You must be logged in to view your dashboard.', 'notice');
            $app->redirect('index.php?option=com_users&view=login&return=' . base64_encode('index.php?option=com_legacylink'));
            return;
        }

        // Assign data to the view
        $this->item = $this->get('Item');

        // Display the view template
        parent::display($tpl);
    }
}
