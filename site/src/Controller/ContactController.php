<?php
namespace Jules\Component\LegacyLink\Site\Controller;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\Factory;
use Joomla\CMS\Router\Route;

/**
 * Controller for handling contact actions.
 */
class ContactController extends BaseController
{
    /**
     * The save task for adding a new contact.
     *
     * @return void
     */
    public function save()
    {
        // Check for request forgeries
        $this->checkToken();

        $app   = Factory::getApplication();
        $model = $this->getModel('Contacts');
        $data  = $this->input->post->get('jform', [], 'array');

        if ($model->save($data)) {
            $this->setMessage('Contact saved successfully.');
        } else {
            $this->setMessage($model->getError(), 'error');
        }

        $this->setRedirect(Route::_('index.php?option=com_legacylink&view=contacts', false));
    }
}
