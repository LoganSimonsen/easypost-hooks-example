require("dotenv").config();
require("@easypost/api");
const fs = require("fs");

const apiKey = process.env.TEST_KEY;
// const apiKey = process.env.PROD_KEY;

const EasyPost = require("@easypost/api");
const api = new EasyPost(apiKey);

//log outgoing HTTP request to a file
const logOutgoingRequest = (request) =>
  fs.writeFile(
    "./logs/last_request.json",
    JSON.stringify(request, 0, 2),
    (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    }
  );

//log HTTP response to a file
const logResponse = (response) =>
  //Write Last Response to File for easier reading.
  fs.writeFile(
    "./logs/last_response.json",
    JSON.stringify(response, 0, 2),
    (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    }
  );

// optionally add your hook to listen for outgoing requests
api.addRequestHook(logOutgoingRequest);
// and optionally the hook for the response
api.addResponseHook(logResponse);

(async () => {
  let shipment;

  shipment = await api.Shipment.create({
    to_address: {
      name: "Dr. Steve Brule",
      street1: "179 N Harbor Dr",
      city: "Redondo Beach",
      state: "CA",
      zip: "90277",
      country: "US",
      email: "dr_steve_brule@gmail.com",
      phone: "4155559999",
    },
    from_address: {
      street1: "417 montgomery street",
      street2: "FL 5",
      city: "San Francisco",
      state: "CA",
      zip: "94104",
      country: "US",
      company: "EasyPost",
      phone: "415-123-4567",
    },
    parcel: {
      length: 20.2,
      width: 10.9,
      height: 5,
      weight: 65.9,
    },
    // carrier_accounts:{"ca_..."}, // for when you want to limit the carrier accounts you rate against.
    reference: "shipment.reference",
  });
  console.log(
    `shipment ${shipment.id} created, check log files for more details.`
  );
})();
