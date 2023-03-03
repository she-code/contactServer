const Contact = require("../models/contactModel");
exports.createContact = async (req, res, next) => {
  try {
    const { firstName, phoneNo, lastName, email, groups } = req.body;
    const contactOwner = req.user;
    const contact = await Contact.create({
      firstName,
      lastName,
      phoneNo,
      email,
      groups,
      contactOwner,
    });
    if (contact) {
      res.status(200).json({
        status: "success",
        contact,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: {
        message: error.message,
      },
    });
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { firstName, phoneNo, lastName, email, groups } = req.body;
    const contactOwner = req.user;
    const id = req.params.id;
    const contact = await Contact.findOneAndUpdate(
      { _id: id, contactOwner },
      {
        firstName,
        lastName,
        phoneNo,
        email,
        groups,
      },
      { new: true }
    );
    if (contact) {
      res.status(200).json({
        status: "success",
        contact,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: {
        message: error.message,
      },
    });
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contactOwner = req.user;
    await Contact.findOneAndDelete({ _id: id, contactOwner });

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: {
        message: error.message,
      },
    });
  }
};

exports.getAllContactsByCreator = async (req, res, next) => {
  try {
    const contactOwner = req.user;
    const contacts = await Contact.find({ contactOwner });
    if (contacts) {
      res.status(200).json({
        status: "success",
        result: contacts.length,
        contacts,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: {
        message: error.message,
      },
    });
  }
};

exports.getContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if (contact) {
      res.status(200).json({
        status: "success",
        contact,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: {
        message: error.message,
      },
    });
  }
};
