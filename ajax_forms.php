<?php
class AjaxFormsComponent extends Object{
      public $components = array('RequestHandler');

      public function startup($controller){
             $this->controller = $controller;
      }

      public function beforeRender(){
             if ($this->controller->data && $this->RequestHandler->isAjax()){
                $invalid = array();
                $ok = true;
                foreach($this->controller->data as $model=>$vals){
                    $this->controller->loadModel($model);
                    $invalid[$model] = $this->controller->{$model}->invalidFields();
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
