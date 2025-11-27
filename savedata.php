<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $participant_id = filter_input(INPUT_POST, 'participant_id', FILTER_SANITIZE_STRING);
    $session_id = filter_input(INPUT_POST, 'session_id', FILTER_SANITIZE_STRING);
    $cashout = filter_input(INPUT_POST, 'cashout', FILTER_SANITIZE_NUMBER_INT);
    $sport = filter_input(INPUT_POST, 'sport', FILTER_SANITIZE_STRING);
    $matchup = filter_input(INPUT_POST, 'matchup', FILTER_SANITIZE_STRING);
    $option = filter_input(INPUT_POST, 'option', FILTER_SANITIZE_STRING);
    $odds = filter_input(INPUT_POST, 'odds', FILTER_SANITIZE_STRING);
    $amount = filter_input(INPUT_POST, 'amount', FILTER_SANITIZE_NUMBER_INT);

    // Prepare data line for CSV
    $data = [$participant_id, $session_id, $cashout, $sport, $matchup, $option, $odds, $amount];
    $csvLine = implode(",", $data) . "\n";

    // File path to save the CSV data
    $filePath = "data/experiment_data.csv";

    // Append data to a file
    $file = fopen($filePath, "a");
    fwrite($file, $csvLine);
    fclose($file);
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["message" =>"Invalid request"]);
}
exit;

?>
