// models/cart_item.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CartItem = sequelize.define("CartItem", {
  cart_item_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  added_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "cart_items",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: [ "product_id"], // prevent duplicates
    },
  ],
});

// Associations (assuming you already defined Cart & Product models)
CartItem.associate = (models) => {
  CartItem.belongsTo(models.Product, { foreignKey: "product_id" });
};

export default CartItem;
