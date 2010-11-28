<?php
class PagesController extends AppController{
      public $components = array('RequestHandler');
      public $helpers = array('Form', 'Javascript');
      public $rendered = false;

      public function home(){
             if ($this->data){
                 $this->Page->set($this->data);
                 $this->Page->validates();
             }
      }

      public function beforeRender(){
             if ($this->data && $this->RequestHandler->isAjax()){
                $invalid = array();
                $ok = true;
                foreach($this->data as $model=>$vals){
                    $this->loadModel($model);
                    $invalid[$model] = $this->{$model}->invalidFields();
                    if ($invalid[$model]) $ok = false;
                }
                $object = compact('ok', 'invalid');
                App::import('Helper', 'Javascript');
                $js = new JavascriptHelper();
                echo $js->object($object);
                exit;
             }
      }
}
