const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
    },
    code: {
      type: String,
      required: [true, 'Each user must have user code'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    avatar: String,
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      required: [true, 'Each user must have a role'],
      // default: 'student',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm a password'],
      validate: {
        // This only works on CREATE and SAVE
        validator: function (el) {
          return el === this.password
        },
        message: 'Passwords are not the same',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    dateOfBirth: Date,
    phoneNumber: Number, // String: maybe
    address: {
      type: {
        type: String,
      },
      village: String,
      townOrDistrict: String,
      cityOrProvince: String,
    },
    school: String, // consider its
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    classId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Class',
    },
    departmentId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Department',
    },
    specialityId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Speciality',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'classId',
    select: 'name',
  })
    .populate({
      path: 'departmentId',
      select: 'name',
    })
    .populate({
      path: 'specialityId',
      select: 'name',
    })

  next()
})

userSchema.pre('save', async function (next) {
  // Only run this function if password is actually modified
  if (!this.isModified('password')) return next()

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined
  next()
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000
  next()
})

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } })
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )

    return JWTTimestamp < changedTimestamp
  }

  // False means NOT changed
  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

const User = mongoose.model('User', userSchema)

module.exports = User
