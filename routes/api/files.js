const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const path = require("path");

const jwtClient = new google.auth.JWT(
  "fotazapp@fotazapp-1599353785705.iam.gserviceaccount.com",
  null,
  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7AbJg9CxK5qk6\nzIl6sPEKLaoOKX66jj03LLUgj56ZihEtJiK32eZoSTxmAuBQzorK4iaxUWs2YCxm\nn1Y0wkO0/4Q3thJ1pxwoqUcv/B7dW+VS6CbZvHYP2k5d8XH3+Ak/mwcF5ezvYZPg\n5J0c8Nm4TSuZD3Nhizr37jxMp+sFP2n84WvYa5uAyZFCG+WiNO2DlHp2wVOc3sIM\naqcOo3+q/2MFbKwSYRc+Oq8uzwEWGcvzX/m+X4sVtnv/IBqFQujrkyR9pHIj53Ch\nsQLciXDBaLrN2skB1Wx809B0UjgNw6BC3goG5ZSL7YiveWH8wp3+4N7d46xY9Ey3\n6DtK5zplAgMBAAECggEAJyLDhSlMdK9hhqHj+pZ5l0b3sgeKkzmtw3R6gnIz/49m\nqVN0DBRQtQ3wkyuybI7Q+oUKEm1G2eYWHLLnTFrEZyZbMfqLUe5zROoqMPdbMTmo\nXCmj6cjYT1iBMoVTM9EHhHVp6pjT9UPvOe82FyardbfGsj1KyQTlhhnoKiWxGFNx\nTueJExOIGCTbe09UUFMAi6NaqROKQYaDZ9w3Oaxg/OxhowNrjk91aR6t1jlgxLYe\nd4Pzz3ylWvY4ghN58rJ0VTTtDspmvRro7bo5XzPNiAIA6QluYffNZKsdAcd4i4zl\nCz84DKE8poOkS/UmZmdJUDivgFh3IiGsQqrycr8pwQKBgQDxsQXj9h8lssFUpfSZ\nrauMWyafBuwWkyFqVhw9S5YZTwwMWUS8jyl+s1LkUyVciIacb2TeiFkg3S7FXVpB\nEdgAb2xKe9vvYapCQEJHkWBitZHSVapq79SaGjQRvd774yumGjNUiOebua+GgmDg\n4h6U/RsCceLbXpqtqSl5r+V0pQKBgQDGE+R0BtDBzCqieRga/2+cGbo0922ofkbC\nHJcVyK2Ro3SNkuyOHfsOKmA6DKQmkJwzysVPsvsocl9llNe8K8bySmT5aq266J8b\nuzlbLrFD/h6rJy35okmg7WHS9RBAUt2DYRUm5XZ5lFtAVagSUJp+Pm4/EVUKGffY\nSd5SZy0CwQKBgQDPphm7e0/TYbr8cQCvsCg9FGsgIiBgXNROueDVQMWaxPFDAsct\ngYpTEtpa1Jy63YlZidMN5fM9awquAsByO1RrO0+8xqF1D2HqPa80MdCvvfOk1Hjw\nG1F7fJvTyl9z5f8wXD5RmLX0cxo85HM7gspnkvXLqfEQLD2UikvaAqePCQKBgCcH\n8HJ0jVpC0vvlBLz9LI8D+s9JGlCjYWoKnDLsslcKcIMdOoPeoIPwEboel5IJ2N3T\nzQGhcSBNOUMZC1HHBpLj2fXT8ZvtDr02LV0sXD3bq0tqkwKn2f5eCHK7W5JxQbkL\nvlFF0gyvETQiLNY/D9JklvDSh4FQEKiMFcUDE7mBAoGAUSLlUFTUaW7eDr7FYbBI\nt80TWYo8zh1K311sCLMPbeQ9tCXCTsC9ABIGSG/YB6b5UhkrhRC0nv0jReOzLdzt\nJYbJj7Sfh7So3U/BKs9barw8dcApjUOajf7wTuVU5l3BnrB1nCvYp4GKef3jHgXo\nH+hx1cG+BmhRm6OOhGHmoXw=\n-----END PRIVATE KEY-----\n",
  [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.metadata",
    "https://www.googleapis.com/auth/drive.photos.readonly",
  ],
  null
);

const drive = google.drive({
  version: "v3",
  auth: jwtClient,
});

// @route GET api/files
// @desc Test route
// @access Public
router.get("/folders", async (req, res) => {
  try {
    //const auth = await jwtClient.authorize();
    const response = await drive.files.list({
      //folderId: "1akl0Cei6kcAYKGbjIPMrdrM_UMgqvMHq",
      q: "mimeType='application/vnd.google-apps.folder'",
      //spaces: "drive",
    });
    res.json(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET
// @desc Test route
// @access Public
router.get("/folders/:idfolder", async (req, res) => {
  try {
    const { idfolder } = req.params;
    //const auth = await jwtClient.authorize();
    const response = await drive.files.list({
      q: `mimeType='image/jpeg' and parents in '${idfolder}'`,
      fields: "nextPageToken, files(id, name, thumbnailLink)",
      //fields: "files(embedLink)",
      spaces: "drive",
    });
    res.json(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
