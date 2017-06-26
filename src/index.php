<?php
declare(strict_types=1);

function doSomething(int $a, string $b): string {
  if (($b <=> 'spaceship') == $a) {
    echo 'This is displaying the power of PHP 7!';
  } else {
    echo `
      <=> returns -1, 0 or 1 according to <, = and > between 2 values,
      ?? yields the right-side value if the left-side value is null.
    `;
  }
  return $b ?? 'hello';
}

interface Logger {
  public function log(string $msg);
}

class Application {
  private $logger;

  public function getLogger(): Logger {
    return $this->logger;
  }

  public function setLogger(Logger $logger) {
    $this->logger = $logger;
  }
}

$app = new Application;
$app->setLogger(new class implements Logger {
  public function log(string $msg) {
    echo $msg;
  }
});

doSomething(1, 'zimbabwe');
?>
