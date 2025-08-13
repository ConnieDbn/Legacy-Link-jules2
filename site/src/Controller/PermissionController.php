<?php
namespace Jules\Component\LegacyLink\Site\Controller;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\Factory;
use Joomla\CMS\Router\Route;
use Jules\Component\LegacyLink\Site\Model\PermissionsModel;

/**
 * Controller for handling permission actions.
 */
class PermissionController extends BaseController
{
    /**
     * The save task for updating document permissions.
     *
     * @return void
     */
    public function save()
    {
        $this->checkToken();

        $app   = Factory::getApplication();
        $data  = $this->input->post->get('jform', [], 'array');
        $model = new PermissionsModel();

        if ($model->save($data)) {
            $this->setMessage('Permissions saved successfully.');
        } else {
            $this->setMessage($model->getError(), 'error');
        }

        $redirectUrl = 'index.php?option=com_legacylink&view=document&id=' . (int) $data['document_id'];
        $this->setRedirect(Route::_($redirectUrl, false));
    }
}
