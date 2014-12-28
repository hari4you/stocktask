
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="author" content="">
	
	<!-- PLEASE READ - Benzinga_Guidelines.txt which placed at the root location before getting into individual files -->
    
	<!-- Keeping the Favicon as Bootstrap Icon since Both Benzinga and Bootstrap starts with "B" -->

    <link rel="icon" href="favicon.ico">

    <title>Benzinga</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/non-responsive.css" rel="stylesheet">

    
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Benzinga</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            
            <li><a href="#contact">Current Balance - <span class="label label-success" id="totCash"></span></a></li>
            
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Welcome <b>Steve</b></a></li>
            
            <form class="navbar-form navbar-left" role="search" name="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Enter Symbol" id="btnLookupsymbol">
          <input type="hidden" id="lookcompany">  
          <input type="hidden" id="lookquantiy">
          <input type="hidden" id="looksymbol">
        </div>
        <button type="button" class="btn btn-default" id="btnLookupsearch">Lookup</button>
      </form>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
      <div class="container">
	  <!-- Including php files to reduce the dom creation on each page -->			
      <?php include("lookupsection.php"); ?>
      <?php include("companylisting.php"); 

	  
// the message - Tigger a email when ever user visits the site for Metrics purpose {not on client spec}
$msg = "Your site is being viewed";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("infotech.hari@gmail.com","Stock Task",$msg);



      ?>
        

        <!-- -->

          

        <!-- -->
    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js//jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/custom.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
