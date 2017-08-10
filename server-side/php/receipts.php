<?php

/** PHP - API For RampReceipts

@version 1.0

Minimum requirements : PHP 5.3 or higher, CURL module installed

Supported calls ( via .htaccess )
GET /receipts/
GET /receipts/:year/:month/
GET /receipts/customer/
POST /receipts/customer/

*/

namespace RampReceipts;

class Receipts
{
	private static $root_url = 'https://rampreceipts.com/api/v1/receipt/';

    // TODO: Make sure you have your access key defined here
	private static $access_key = 'rr_...';

    // TODO: Stripe customer ID would be loaded from the database (current logged in customer/user)
	private static $customer_id = 'cus_...';

	/** Process incoming requests **/
	static public function listen()
	{
		if (!isset($_GET) && !isset($_POST) )
			return false;

		$request = isset($_GET['request']) ? $_GET['request'] : false;

		if (! $request == 'receipts' || ! $request == 'customer')
			return false;

		if ($request == 'receipts')
			self::get_receipts();

		if ($request == 'customer')
		{
			$action = isset($_GET['action']) ? $_GET['action'] : false;

			if ($action == 'get')
				self::get_customer();
			elseif($action == 'save')
				self::save_customer();
		}
	}

	protected static function get_receipts()
	{
		$year = isset($_GET['year']) ? intval($_GET['year']) : false;
		$month = isset($_GET['month']) ? intval($_GET['month']) : false;

		$args = array('url_param' => '?page-size=60',
				);

		if ($year && $month)
			$args['url_param'] = "/$year/$month";

		self::remote_call($args);
	}

	protected static function remote_call($args = array())
	{
		$url = self::$root_url . self::$customer_id;
		if (isset($args['url_param']))
			$url .= $args['url_param'];

		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$headers = array('Authorization: Token ' . self::$access_key,
						 'Content-Type: application/json',
						);
		$data = json_encode(self::load_customer());

		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

		$output = curl_exec($ch);

		curl_close($ch);

		echo json_encode($output);
		exit();
	}

	/** Load customer from the database
	@return Array customer */
	protected static function load_customer()
	{
        // TODO: load customer data
		$data = array('customer' => array(
				'name' => 'John Doe',
				'address' => array('line1' => 'Elm Street 21',
								   'line2' =>  'App 13',
								   'country' => 'USA',
								   'state' =>  'New York',
								   'city' => 'New York',
								   'zip' => '11000',
							),
				)
			 );

		return $data;
    }

	/** Load customer data and return output as json encoded string **/
	protected static function get_customer()
	{
		$data = self::load_customer();
		echo json_encode($data);
		exit();

	}

	/** Save customer to database **/
	protected static function save_customer()
	{
		// TODO: Save the customer data to DB

		// load customer and send updated data back.
		self::get_customer();
	}
}

Receipts::listen();
