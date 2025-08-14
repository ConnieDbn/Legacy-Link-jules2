<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_legacylink
 *
 * @copyright   Copyright (C) 2025 Jules. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access
defined('_JEXEC') or die;
?>

<div class="legacylink-dashboard">
    <h1><?php echo $this->escape($this->item->greeting); ?></h1>
    <p><?php echo $this->escape($this->item->message); ?></p>

    <div class="uk-alert-primary" uk-alert>
        <div class="uk-flex uk-flex-middle">
            <div class="uk-flex-auto">
                <p class="uk-margin-remove">
                    <strong>Dead Man's Switch Status:</strong>
                    <?php if ($this->item->last_checkin) : ?>
                        Your last check-in was on <?php echo \Joomla\CMS\HTML\HTMLHelper::_('date', $this->item->last_checkin, 'l, d F Y'); ?>.
                    <?php else : ?>
                        You have not checked in yet. Please check in to start the timer.
                    <?php endif; ?>
                </p>
            </div>
            <div>
                <form action="<?php echo \Joomla\CMS\Router\Route::_('index.php?option=com_legacylink&task=userstatus.checkin'); ?>" method="post">
                    <button class="uk-button uk-button-secondary">Check In Now</button>
                    <?php echo \Joomla\CMS\HTML\HTMLHelper::_('form.token'); ?>
                </form>
            </div>
        </div>
    </div>

    <div class="dashboard-summary uk-grid-match uk-child-width-1-2@m" uk-grid>
        <div>
            <div class="uk-card uk-card-default uk-card-body">
                <h3 class="uk-card-title">Your Documents</h3>
                <p>You have <?php echo (int) $this->item->document_count; ?> documents stored.</p>
                <a href="#" class="uk-button uk-button-primary">Manage Documents</a>
            </div>
        </div>
        <div>
            <div class="uk-card uk-card-default uk-card-body">
                <h3 class="uk-card-title">Your Contacts</h3>
                <p>You have <?php echo (int) $this->item->contact_count; ?> trusted contacts.</p>
                <a href="<?php echo \Joomla\CMS\Router\Route::_('index.php?option=com_legacylink&view=contacts'); ?>" class="uk-button uk-button-primary">Manage Contacts</a>
            </div>
        </div>
    </div>

    <hr class="uk-margin-medium">

    <div class="dashboard-upload">
        <h2>Upload a New Document</h2>
        <p>Securely upload a new document to your vault. Select a file and give it a title.</p>

        <!-- This form submits to the 'save' task in our FormController -->
        <form action="<?php echo \Joomla\CMS\Router\Route::_('index.php?option=com_legacylink&task=form.save'); ?>" method="post" enctype="multipart/form-data" class="uk-form-stacked">
            <fieldset class="uk-fieldset">

                <div class="uk-margin">
                    <label class="uk-form-label" for="form-file-upload">Select file</label>
                    <div uk-form-custom="target: true">
                        <input type="file" name="jform[file-upload]" id="form-file-upload" required>
                        <input class="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled>
                    </div>
                </div>

                <div class="uk-margin">
                    <label class="uk-form-label" for="form-file-title">Document Title</label>
                    <div class="uk-form-controls">
                        <input class="uk-input" type="text" name="jform[file-title]" id="form-file-title" placeholder="e.g., Last Will and Testament" required>
                    </div>
                </div>

                <div class="uk-margin">
                    <button type="submit" class="uk-button uk-button-secondary">Upload Document</button>
                </div>

                <?php echo \Joomla\CMS\HTML\HTMLHelper::_('form.token'); ?>
            </fieldset>
        </form>
    </div>

    <hr class="uk-margin-medium">

    <div class="dashboard-documents-list">
        <h2>Your Stored Documents</h2>

        <?php if (!empty($this->item->documents)) : ?>
            <table class="uk-table uk-table-striped uk-table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Filename</th>
                        <th>Size</th>
                        <th>Uploaded On</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($this->item->documents as $document) : ?>
                        <tr>
                            <td><?php echo $this->escape($document->title); ?></td>
                            <td><?php echo $this->escape($document->filename); ?></td>
                            <td><?php echo \Joomla\CMS\HTML\HTMLHelper::_('number.bytes', $document->filesize); ?></td>
                            <td><?php echo \Joomla\CMS\HTML\HTMLHelper::_('date', $document->created_at, 'Y-m-d H:i'); ?></td>
                            <td>
                                <a href="<?php echo \Joomla\CMS\Router\Route::_('index.php?option=com_legacylink&view=document&id=' . (int) $document->id); ?>" class="uk-button uk-button-small uk-button-primary">Permissions</a>
                                <a href="#" class="uk-button uk-button-small uk-button-danger">Delete</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else : ?>
            <p>You have not uploaded any documents yet.</p>
        <?php endif; ?>

    </div>

</div>
