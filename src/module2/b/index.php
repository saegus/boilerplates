<?php
declare(strict_types=1);

function HandleRouteB(int $id, string $query) {
  echo json_encode([
    'id' => $id,
    'query' => $query,
    'route' => 'module2/b'
  ], JSON_UNESCAPED_SLASHES);
}

HandleRouteB(intval($_GET['id']) ?? 0, $_GET['query'] ?? '');

?>
