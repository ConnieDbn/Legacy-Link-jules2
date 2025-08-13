<?php
namespace Jules\Component\LegacyLink\Site\Controller;

// No direct access
defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\BaseController;

/**
 * The display controller for the component.
 * This controller is responsible for handling the frontend display of the component.
 */
class DisplayController extends BaseController
{
    /**
     * The default view for the display controller.
     * When no view is specified in the request, Joomla will use this one.
     *
     * @var string
     */
    protected $default_view = 'dashboard';
}
