<?php
// No direct access to this file
defined('_JEXEC') or die;

/**
 * Script file for LegacyLink component
 */
class Com_LegacyLinkInstallerScript
{
    /**
     * Method to install the component
     *
     * @param   \Joomla\CMS\Installer\Adapter\ComponentAdapter  $parent  The class calling this method
     *
     * @return  void
     */
    public function install($parent)
    {
        // You can add custom installation actions here
    }

    /**
     * Method to uninstall the component
     *
     * @param   \Joomla\CMS\Installer\Adapter\ComponentAdapter  $parent  The class calling this method
     *
     * @return  void
     */
    public function uninstall($parent)
    {
        // You can add custom uninstallation actions here
    }

    /**
     * Method to update the component
     *
     * @param   \Joomla\CMS\Installer\Adapter\ComponentAdapter  $parent  The class calling this method
     *
     * @return  void
     */
    public function update($parent)
    {
        // You can add custom update actions here
    }

    /**
     * Method to run before an install/update/uninstall method
     *
     * @param   string                                          $type    The type of change (install, update or discover_install)
     * @param   \Joomla\CMS\Installer\Adapter\ComponentAdapter  $parent  The class calling this method
     *
     * @return  void
     */
    public function preflight($type, $parent)
    {
        // You can add actions to run before installation/update/uninstallation
    }

    /**
     * Method to run after an install/update/uninstall method
     *
     * @param   string                                          $type    The type of change (install, update or discover_install)
     * @param   \Joomla\CMS\Installer\Adapter\ComponentAdapter  $parent  The class calling this method
     *
     * @return  void
     */
    public function postflight($type, $parent)
    {
        // You can add actions to run after installation/update/uninstallation
    }
}
