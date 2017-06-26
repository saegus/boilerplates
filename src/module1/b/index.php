<?php
declare(strict_types=1);

function HandleRouteB(int $id, string $query) {
  echo json_encode([
    'id' => $id,
    'query' => $query,
    'route' => 'module1/b'
  ], JSON_UNESCAPED_SLASHES);
}

// Return 403
header("HTTP/1.1 403 Unauthorized");
HandleRouteB(intval($_GET['id']) ?? 0, $_GET['query'] ?? '');

?>
