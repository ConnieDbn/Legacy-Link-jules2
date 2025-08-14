<?php
namespace Jules\Component\LegacyLink\Site\Controller;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\FormController as BaseFormController;
use Joomla\CMS\Factory;
use Joomla\CMS\Router\Route;

/**
 * Form Controller for LegacyLink.
 * This controller handles form submissions, such as uploading new documents.
 */
class FormController extends BaseFormController
{
    /**
     * The save task.
     *
     * @return void
     */
    public function save()
    {
        // Check for request forgeries
        $this->checkToken();

        $app   = Factory::getApplication();
        $model = $this->getModel('Document');
        $data  = $this->input->post->get('jform', [], 'array');
        $file  = $this->input->files->get('jform')['file-upload'];

        // The model's save method will handle validation, file moving, and DB insertion.
        $id = $model->save($data, $file);

        if ($id) {
            $this->setMessage('Document uploaded successfully.');
            $this->setRedirect(Route::_('index.php?option=com_legacylink&view=dashboard', false));
        } else {
            // The model should have set a specific error message.
            $this->setMessage($model->getError(), 'error');
            $this->setRedirect(Route::_('index.php?option=com_legacylink&view=dashboard', false));
        }
    }
}
