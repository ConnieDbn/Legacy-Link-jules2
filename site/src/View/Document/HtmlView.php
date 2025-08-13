<?php
namespace Jules\Component\LegacyLink\Site\View\Document;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
use Joomla\CMS\Factory;
use Jules\Component\LegacyLink\Site\Model\ContactsModel;

/**
 * The HTML view for the single Document screen.
 */
class HtmlView extends BaseHtmlView
{
    /**
     * The document item
     */
    public $item;

    /**
     * The list of user's contacts
     */
    public $contacts;

    /**
     * The list of contact IDs that have permission for this document
     */
    public $granted_contacts;

    public function display($tpl = null)
    {
        $user = Factory::getUser();
        if ($user->get('guest')) {
            $app = Factory::getApplication();
            $app->enqueueMessage('You must be logged in to view this page.', 'notice');
            $app->redirect('index.php?option=com_users&view=login');
            return;
        }

        // Get the document details
        $this->item = $this->get('Item');

        // If the document doesn't exist or doesn't belong to the user, redirect
        if (!$this->item) {
            Factory::getApplication()->enqueueMessage('Document not found.', 'error');
            Factory::getApplication()->redirect('index.php?option=com_legacylink&view=dashboard');
            return;
        }

        // Get all of the user's contacts
        $contactsModel = new ContactsModel();
        $this->contacts = $contactsModel->getItems();

        // Get the contacts that already have permission for this document
        $permissionsModel = new \Jules\Component\LegacyLink\Site\Model\PermissionsModel();
        $this->granted_contacts = $permissionsModel->getGrantedContactIds($this->item->id);

        parent::display($tpl);
    }
}
