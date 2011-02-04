<?php
class AjaxFormsComponent extends Object{
      public $components = array('RequestHandler');
	  public $doBeforeRender = true;
	  public $viewToRender = false;

      public function startup($controller){
             $this->controller = $controller;
      }

      public function beforeRender(){
             if ($this->controller->data && $this->RequestHandler->isAjax() && $this->doBeforeRender){
                $invalid = array();
                $ok = true;
				$rendered = null;

                foreach($this->controller->data as $model=>$vals){
                    $this->controller->loadModel($model);
                    $invalid[$model] = $this->controller->{$model}->validationErrors;
                    if ($invalid[$model]) $ok = false;
                }

				//Render the view and save it if needed
				if ($this->viewToRender){
					$this->doBeforeRender = false;
					$this->controller->autoLayout = false;
					$rendered = $this->controller->render($this->viewToRender);
				}


				$data = $this->controller->data;
                $object = compact('ok', 'invalid', 'data', 'rendered');
                App::import('Helper', 'Javascript');
                $js = new JavascriptHelper();
                echo $js->object($object);
                exit;
             }
      }
}
