<!DOCTYPE HTML>
<html>
	<head>
		<title>Bank Project - Pilot Questionnaire</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
		<!-- Importing libraries -->
		<link rel="stylesheet" type="text/css" href="../lib/bootstrap-yeti.css">
		<link rel="stylesheet" type="text/css" href="../lib/slider.css">
		<script type="text/javascript" src="../lib/jquery.js"></script>
		<script type="text/javascript" src="../lib/bootstrap.js"></script>
		<script type="text/javascript" src="../lib/slider.js"></script>
		<!-- Specific styles and scripts -->
		<link rel="stylesheet" type="text/css" href="./banktsd.css">
		<script type="text/javascript" src="./banktsd.js"></script>
	</head>
	<body>
		<nav class="navbar navbar-default navbar-static-top" role="navigation">
			<div class="navbar-header">
				<a class="navbar-brand brand-center">Bank - Track Support Design</a>
			</div>
		</nav>
		<div class="modal fade" id="start" role="dialog" style="overflow:auto;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header" style="padding:15px;">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h2 class="modal-title" id="myModalLabel">Hi !</h2>
					</div>
					<div class="modal-body" style="padding:15px;">
						<p><small>Thank you for participating in this survey. Its Purpose is to help everyone working on the <b>Bank SCU project</b> understand who communicates with who and how that influences the achievement of successful delivery. All responses will be treated as confidential. Responses are aggregated to identify trends; individual answers to questions will <b>not</b> be made public. The survey is of greatest use when questions are answered honestly and candidly. <br> It is important that if there are other people who you communicate with in relation to this issue who aren’t shown in the list, you add their names at the end.  It doesn’t matter at all what organisation they work for, how senior they are or what their role is.   <br> When the data has been processed the aggregated results and trends will be shared with the team.</small></p>
					</div>
					<div class="modal-footer" style="text-align:center;padding:15px;">
						<button type="button" data-dismiss="modal" class="btn btn-primary btn-sm" style="padding:6px 13px;font-size:13px;">Start the Survey</button>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row" style="vertical-align:middle;margin-bottom:15px">
				<div class="col-sm-4">
					<div class="form-group">
						<label><strong>Name</strong></label>
						<input id="name" class="form-control update" type="text" placeholder="Fill in your name...">
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label><strong>Organisation</strong></label>
						<input id="org" class="form-control update" type="text" placeholder="By whom are you contractually employed?">
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label><strong>Role</strong></label>
						<input id="role" class="form-control update" type="text" placeholder="What is your job role?">
					</div>
				</div>
			</div>
			<div class="row" style="vertical-align:middle;margin-bottom:15px">
				<div class="col-sm-6 form-inline" style="text-align:left;">
					<div class="form-group">
					<label><strong>Have you been involved in agreeing the track support design philosophy (including in relation to impacts on noise, vibration and pile isolation)?</strong></label>
					<select id="invo" class="form-control" style="padding:2px;height:25px">
						<option value="0">no</option>
						<option value="1">yes</option>
					</select>
					</div>
				</div>	
				<div class="col-sm-6" style="text-align:left;">
					<div class="form-group">
						<label><strong>Approximately what percentage of your working time do you usually spend on the Bank SCU project?</strong></label>
						<input id="time" class="form-control update" type="number" placeholder="in %" style="width:50%;display: inline-block;">
					</div>
				</div>
			</div>
			<div id="tableinst" class="row" style="vertical-align:middle;margin-bottom:20px">
				<div class="col-sm-12 form-inline" style="text-align:left;">
					<label>The aim of the following table is to capture who you communicate with to resolve issues concerning the track support design.
						In the list of names presented Please tick the checkbox next to the people who you communicate with and use the sliders to indicate the quality of communication between you and them. It is important that if there are other people who you communicate with in relation to this issue who aren’t shown in the list, you add their names at the end.  It doesn’t matter at all what organisation they work for, how senior they are or what their role is.  Instructions are given below,
					</label>
					<div class="row" style="margin-top:10px;">
						<div class="col-sm-6">
							<label><b>Frequency : </b>Please select the appropriate number based on how often do you communicate with the person as given below,<br>⑥ More than once a day | ⑤ Daily | ④ Several times a week | ③ A few times a week | ② Once a week | ① Less than once a week</label>
						</div>
						<div class="col-sm-6">
							<label><b>For the rest : </b> Please select the appropriate number based on your level of agreement with the corresponding statements (shown by clicking the headings)<br>⑤ Strongly agree | ④ Agree | ③ Ambivalent | ② Disagree | ① Strongly Disagree</label>
						</div>
					</div>
				</div>
			</div>
			<div class="table-responsive"><table class="table table-bordered table-condensed table-hover"><thead>
				<tr>
				<th width="20px"></th>
				<th style="padding-left:10px;padding-right:10px"><input class = "form-control" id="search" type="text" placeholder="search" autocomplete="off"></th>
				<th width="125px"><div data-toggle="tooltip" data-placement="top" title="How frequently do you contact this person in relation to the issue?" class="ttp">Frequency</div></th>
				<th width="125px"><div data-toggle="tooltip" data-placement="top" title="Information I obtain from communicating with this person is important to resolving the issue" class="ttp">Importance</div></th>
				<th width="125px"><div data-toggle="tooltip" data-placement="top" title="Information I obtain from communicating with this person is clear" class="ttp">Clarity</div></th>
				<th width="125px"><div data-toggle="tooltip" data-placement="top" title="Information I obtain from communicating with this person is accurate" class="ttp">Accuracy</div></th>
				<th width="125px"><div data-toggle="tooltip" data-placement="top" title="Information I obtain from communicating with this person is timely" class="ttp">Timeliness</div></th>
				<th width="125px"><div data-toggle="tooltip" data-placement="top" title="I know where I stand when dealing with this person" class="ttp">Understanding</div></th>
				<th width="125px"><div data-toggle="tooltip" data-placement="top" title="I can rely on this person to share information that they have which may be of benefit to me" class="ttp">Reliability</div></th>
				</tr>
			</thead><tbody></tbody></table></div>
		</div>
		<div class="container">
			<div class="panel panel-default">
				<div class="panel-body" style="text-align:center;">
					<button id="submitbutton" class="btn btn-primary btn-md " style="padding:5px 8px">Submit the form</button>
					<h4>Thank you :) </h4>
					<div style="font-size:x-small;">If you have any questions about the survey please speak to <strong>Simon Addyman</strong>.<br>For any technical queries or support completing the survey contact <strong>Balamurugan Soundararaj</strong><br>(<a href="mailto:BalaSoundararaj@tfl.gov.uk">BalaSoundararaj@tfl.gov.uk</a> | 07473964562)</div>
				</div>
			</div>
		</div>
	</body>
</html>

	
