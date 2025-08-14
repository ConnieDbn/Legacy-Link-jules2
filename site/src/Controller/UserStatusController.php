<?php
namespace Jules\Component\LegacyLink\Site\Controller;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\Factory;
use Joomla\CMS\Router\Route;
use Jules\Component\LegacyLink\Site\Model\UserStatusModel;

/**
 * Controller for handling user status actions, like check-ins.
 */
class UserStatusController extends BaseController
{
    /**
     * The check-in task.
     *
     * @return void
     */
    public function checkin()
    {
        $this->checkToken('post');

        $user = Factory::getUser();
        if ($user->get('guest')) {
            $this->setMessage('You must be logged in to perform this action.', 'error');
            $this->setRedirect(Route::_('index.php?option=com_users&view=login', false));
            return;
        }

        $model = new UserStatusModel();

        if ($model->checkin($user->id)) {
            $this->setMessage('Thank you for checking in! Your timer has been reset.');
        } else {
            $this->setMessage('There was an error checking in. Please try again.', 'error');
        }

        $this->setRedirect(Route::_('index.php?option=com_legacylink&view=dashboard', false));
    }
}
