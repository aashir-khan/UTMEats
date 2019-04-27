let apiKey;

// Production
if (process.env.FireBaseKey && process.env.FireBaseKeyId) {
  apiKey = {
    type: "service_account",
    project_id: "utm-eats",
    client_email: "firebase-adminsdk-vk7ne@utm-eats.iam.gserviceaccount.com",
    client_id: "107279350180436614252",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vk7ne%40utm-eats.iam.gserviceaccount.com"
  };

  apiKey["private_key_id"] = process.env.FireBaseKeyId;
  apiKey["private_key"] = process.env.FireBaseKey.replace(/\\n/g, "\n");

  // Local Testing
} else {
  apiKey = require("../api_keys/FireBaseKey.json");
}

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(apiKey)
});

const db = admin.firestore();

exports.set = async function(collection, doc = null, info, idName = null) {
  let ref;

  if (doc !== null) {
    ref = db.collection(collection).doc(doc);
  } else {
    ref = db.collection(collection).doc();
  }

  let id = ref.id;
  if (idName) {
    // idName = Object.keys({ idName })[0]; // convert variable name to string
    info = { ...info, ...{ [idName]: id } };
  }

  try {
    const data = await ref.set(info);
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.get = async function(collection, doc) {
  const ref = db.collection(collection).doc(doc);

  try {
    const data = await ref.get();
    return data.data();
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.getAll = async function(collection) {
  try {
    const snapshot = await db.collection(collection).get();
    let data = [];
    snapshot.forEach(doc => {
      data.push(doc.data());
    });
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

exports.query = async function(collection, field, op, value, order) {
  try {
    if (!field && !op && !value) {
      return await db
        .collection(collection)
        .orderBy(order, "asc")
        .get();
    }

    if (!order) {
      return await db
        .collection(collection)
        .where(field, op, value)
        .get();
    }
    return await db
      .collection(collection)
      .orderBy(order, "desc")
      .where(field, op, value)
      .get();
  } catch (err) {
    console.log(err);
    return;
  }
};

exports.update = async function(collection, doc, info) {
  try {
    const ref = db.collection(collection).doc(doc);
    return await ref.update(info);
  } catch (err) {
    return;
  }
};

exports.remove = function(collection, document, del) {
  // Delete document
  if (!del) {
    const deleteDoc = db
      .collection(collection)
      .doc(doc)
      .delete();

    return deleteDoc.then(res => {
      console.log("Delete: ", res);
    });

    // Delete fields
  } else {
    const fieldValue = require("firebase-admin").firestore.FieldValue;
    const ref = db.collection(collection).doc(document);

    const removeFields = {};

    for (let item of del) {
      removeFields[item] = fieldValue.delete();
    }

    return ref.update(removeFields).then(res => {
      return; // do nothing
    });
  }
};
