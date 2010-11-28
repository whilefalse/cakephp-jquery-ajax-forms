<?php
class Page extends AppModel{
      public $useTable = false;

      public $validate = array(
                'name' => array(
                       'rule' => array('minLength',2),
                       'required' => true,
                       'message' => 'Must have name'));
}
