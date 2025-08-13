<?php
// No direct access
defined('_JEXEC') or die;
?>
<h1>Document: <?php echo $this->escape($this->item->title); ?></h1>

<div class="uk-grid-match uk-child-width-1-2@m" uk-grid>
    <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">Details</h3>
            <ul class="uk-list uk-list-striped">
                <li><strong>Title:</strong> <?php echo $this->escape($this->item->title); ?></li>
                <li><strong>Filename:</strong> <?php echo $this->escape($this->item->filename); ?></li>
                <li><strong>Size:</strong> <?php echo \Joomla\CMS\HTML\HTMLHelper::_('number.bytes', $this->item->filesize); ?></li>
                <li><strong>Uploaded:</strong> <?php echo \Joomla\CMS\HTML\HTMLHelper::_('date', $this->item->created_at, 'Y-m-d H:i'); ?></li>
            </ul>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">Grant Access</h3>
            <p>Select the trusted contacts who should have access to this document.</p>
            <form action="<?php echo \Joomla\CMS\Router\Route::_('index.php?option=com_legacylink&task=permission.save'); ?>" method="post" class="uk-form-stacked">
                <fieldset class="uk-fieldset">
                    <div class="uk-margin">
                        <?php if (!empty($this->contacts)) : ?>
                            <?php foreach ($this->contacts as $contact) : ?>
                                <label>
                                    <input class="uk-checkbox" type="checkbox" name="jform[contacts][]" value="<?php echo (int) $contact->id; ?>" <?php echo in_array($contact->id, $this->granted_contacts) ? 'checked' : ''; ?>>
                                    <?php echo $this->escape($contact->name); ?> (<?php echo $this->escape($contact->email); ?>)
                                </label><br>
                            <?php endforeach; ?>
                        <?php else : ?>
                            <p>You have no contacts to grant access to. Please <a href="<?php echo \Joomla\CMS\Router\Route::_('index.php?option=com_legacylink&view=contacts'); ?>">add a contact</a> first.</p>
                        <?php endif; ?>
                    </div>
                    <div class="uk-margin">
                        <input type="hidden" name="jform[document_id]" value="<?php echo (int) $this->item->id; ?>">
                        <button type="submit" class="uk-button uk-button-primary">Save Permissions</button>
                    </div>
                    <?php echo \Joomla\CMS\HTML\HTMLHelper::_('form.token'); ?>
                </fieldset>
            </form>
        </div>
    </div>
</div>

<p class="uk-margin-top">
    <a href="<?php echo \Joomla\CMS\Router\Route::_('index.php?option=com_legacylink&view=dashboard'); ?>" class="uk-button uk-button-default">&larr; Back to Dashboard</a>
</p>
