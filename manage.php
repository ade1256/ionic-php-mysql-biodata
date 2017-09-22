<?php
   header('Access-Control-Allow-Origin: *');

   // Define database connection parameters
   $hn      = 'localhost';
   $un      = 'root';
   $pwd     = '';
   $db      = 'biodata2';
   $cs      = 'utf8';

   $dsn  = "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt  = array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo  = new PDO($dsn, $un, $pwd, $opt);

   // Retrieve specific parameter from supplied URL
   $key  = strip_tags($_REQUEST['key']);
   $data    = array();

 switch($key)
   {

      // Add a new record to the technologies table
      case "create":

         // Sanitise URL supplied values
         $namaDepan      = filter_var($_REQUEST['namaDepan'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $namaBelakang   = filter_var($_REQUEST['namaBelakang'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $jenisKelamin   = filter_var($_REQUEST['jenisKelamin'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $alamat         = filter_var($_REQUEST['alamat'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $noTelp         = filter_var($_REQUEST['noTelp'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $email          = filter_var($_REQUEST['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

         // Attempt to run PDO prepared statement
         try {
            $sql  = "INSERT INTO biodata2 (namaDepan, namaBelakang, jenisKelamin,alamat,noTelp,email) VALUES (:namaDepan, :namaBelakang, :jenisKelamin, :alamat, :noTelp, :email)";
            $stmt    = $pdo->prepare($sql);
            $stmt->bindParam(':namaDepan', $namaDepan, PDO::PARAM_STR);
            $stmt->bindParam(':namaBelakang', $namaBelakang, PDO::PARAM_STR);
            $stmt->bindParam(':jenisKelamin', $jenisKelamin, PDO::PARAM_STR);
            $stmt->bindParam(':alamat', $alamat, PDO::PARAM_STR);
            $stmt->bindParam(':noTelp', $noTelp, PDO::PARAM_INT);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);

            $stmt->execute();

            echo json_encode(array('message' => 'Cong'));
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;



      // Update an existing record in the technologies table
      case "update":

         // Sanitise URL supplied values
         $namaDepan      = filter_var($_REQUEST['namaDepan'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $namaBelakang   = filter_var($_REQUEST['namaBelakang'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $jenisKelamin   = filter_var($_REQUEST['jenisKelamin'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $alamat         = filter_var($_REQUEST['alamat'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $noTelp         = filter_var($_REQUEST['noTelp'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $email          = filter_var($_REQUEST['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
         $recordID       = filter_var($_REQUEST['recordID'], FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $sql  = "UPDATE biodata2 SET namaDepan = :namaDepan, namaBelakang = :namaBelakang, jenisKelamin = :jenisKelamin, alamat = :alamat, noTelp = :noTelp, email = :email WHERE idBiodata = :recordID";
            $stmt =  $pdo->prepare($sql);
            $stmt->bindParam(':namaDepan', $namaDepan, PDO::PARAM_STR);
            $stmt->bindParam(':namaBelakang', $namaBelakang, PDO::PARAM_STR);
            $stmt->bindParam(':jenisKelamin', $jenisKelamin, PDO::PARAM_STR);
            $stmt->bindParam(':alamat', $alamat, PDO::PARAM_STR);
            $stmt->bindParam(':noTelp', $noTelp, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);

            $stmt->execute();

            echo json_encode('Congratulations the record ' . $namaDepan . ' was updated');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;



      // Remove an existing record in the technologies table
      case "delete":

         // Sanitise supplied record ID for matching to table record
         $recordID   =  filter_var($_REQUEST['recordID'], FILTER_SANITIZE_NUMBER_INT);

         // Attempt to run PDO prepared statement
         try {
            $pdo  = new PDO($dsn, $un, $pwd);
            $sql  = "DELETE FROM biodata2 WHERE idBiodata = :recordID";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $namaDepan . ' was removed');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

      break;
   }

?>