<?php
echo $this->Html->script(array('jquery', 'jquery.form', 'jquery.cake.form', 'cake.form'), false);
echo $this->Form->create('Page', array('url' => $this->here));
echo $this->Form->input('name');
echo $this->Form->end('Submit');
