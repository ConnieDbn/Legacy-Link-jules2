<?php
namespace Jules\Component\LegacyLink\Site\View\Contacts;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
use Joomla\CMS\Factory;

/**
 * The HTML view for the Contacts management screen.
 */
class HtmlView extends BaseHtmlView
{
    /**
     * The list of contacts
     *
     * @var array
     */
    public $items;

    /**
     * Display the view
     *
     * @param   string  $tpl  The name of the template file to parse.
     *
     * @return  void
     */
    public function display($tpl = null)
    {
        $user = Factory::getUser();

        // Redirect guests to the login page
        if ($user->get('guest')) {
            $app = Factory::getApplication();
            $app->enqueueMessage('You must be logged in to manage contacts.', 'notice');
            $app->redirect('index.php?option=com_users&view=login&return=' . base64_encode('index.php?option=com_legacylink&view=contacts'));
            return;
        }

        // Get data from the model
        $this->items = $this->get('Items');

        // Display the view template
        parent::display($tpl);
    }
}
