<?php
// No direct access
defined('_JEXEC') or die;
?>
<h1>Manage Your Trusted Contacts</h1>
<p>Add the people you trust to access your documents. You can assign permissions after adding them.</p>

<hr class="uk-margin-medium">

<!-- Add New Contact Form -->
<h2>Add a New Contact</h2>
<form action="<?php echo \Joomla\CMS\Router\Route::_('index.php?option=com_legacylink&task=contact.save'); ?>" method="post" class="uk-form-stacked">
    <fieldset class="uk-fieldset">
        <div class="uk-margin">
            <label class="uk-form-label" for="form-contact-name">Full Name</label>
            <div class="uk-form-controls">
                <input class="uk-input" type="text" name="jform[name]" id="form-contact-name" placeholder="e.g., Jane Doe" required>
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="form-contact-email">Email Address</label>
            <div class="uk-form-controls">
                <input class="uk-input" type="email" name="jform[email]" id="form-contact-email" placeholder="e.g., jane.doe@example.com" required>
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="form-contact-relationship">Relationship (Optional)</label>
            <div class="uk-form-controls">
                <input class="uk-input" type="text" name="jform[relationship]" id="form-contact-relationship" placeholder="e.g., Daughter, Lawyer">
            </div>
        </div>
        <div class="uk-margin">
            <button type="submit" class="uk-button uk-button-primary">Save Contact</button>
        </div>
        <?php echo \Joomla\CMS\HTML\HTMLHelper::_('form.token'); ?>
    </fieldset>
</form>

<hr class="uk-margin-medium">

<!-- Existing Contacts List -->
<h2>Your Contacts</h2>
<?php if (!empty($this->items)) : ?>
    <table class="uk-table uk-table-striped uk-table-hover">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Relationship</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($this->items as $item) : ?>
                <tr>
                    <td><?php echo $this->escape($item->name); ?></td>
                    <td><?php echo $this->escape($item->email); ?></td>
                    <td><?php echo $this->escape($item->relationship); ?></td>
                    <td>
                        <a href="#" class="uk-button uk-button-small uk-button-danger">Delete</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
<?php else : ?>
    <p>You have not added any contacts yet.</p>
<?php endif; ?>
