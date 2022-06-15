module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        email: {
            type: String,
            unique: true,
            lowercase: true
        },
        password: String,
        image: String,
        otp: String,
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Admins = mongoose.model("admin", schema);
    return Admins;
  };