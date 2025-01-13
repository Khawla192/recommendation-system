const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
    enum: ['Asus', 'Lenovo', 'Acer', 'Dell', 'Apple', 'Samsung', 'HP', 'Microsoft', 'MSI', 'LG', 'Razer', 'Huawei', 'Honor', 'other',],
  },
  category: {
    type: String,
    required: true,
    enum: ['Gaming', 'Student', 'Work', 'Designer', 'Sound Production',],
  },
  display: {
    screenSize: {
      type: Number,
      required: true,
      enum: ['11.6 inches', '12 inches', '13 inches', '13.3 inches', '14 inches', '15.6 inches', '17 inches', '17.3 inches', '18 inches', 'other',],
    },
    resolution: {
      type: String, 
      required: true,
      enum: ['HD: 1366x768', 'Full HD (FHD): 1920x1080', 'Quad HD (QHD)/2k: 2560x1440', 'Ultra (UHD HD)/4K: 3840x2160', '5K: 5120x2880',],
    },
    touchscreen: Boolean,
  },
  processor: {
    type: String,
    required: true,
    enum: ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'Intel Pentium/Celeron', 'Intel Xeon', 'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9', 'AMD Athlon', 'other',],
  },
  ram: {
    type: String,
    required: true,
    enum: ['4GB', '8GB', '16GB', '32GB', '64GB and above',],
  },
  storage: {
    type: String,
    enum: ['HDD (Hard Disk Drive)', 'SSD (Solid State Drive)',],
  },
  storageSize: {
    type: Number,
  },
  graphics: {
    type: String,
    enum: ['Integrated Graphics', 'Dedicated Graphics (Discrete Graphics)', 'other',],
  },
  os: {
    type: String,
    enum: ['Windows', 'macOS', 'Chrome OS', 'Linux',]
  },
  weight: Number,
  reviews: [
    {
      rating: {
        type: Number, 
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,]
    },
      text: String,
    },
  ],
  images: {
    type: [String],
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  laptops: [laptopSchema],
});

const User = mongoose.model('userSchema', userSchema);

module.exports = User;
