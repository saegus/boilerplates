<?php
declare(strict_types=1);

function HandleRouteA(int $id, string $query) {
  echo json_encode([
    'id' => $id,
    'query' => $query,
    'route' => 'module2/a'
  ], JSON_UNESCAPED_SLASHES);
}

HandleRouteA(intval($_GET['id']) ?? 0, $_GET['query'] ?? '');

?>
