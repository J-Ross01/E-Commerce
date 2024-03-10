const { Sequelize, DataTypes } = require('sequelize');
const CategoryModel = require('../Category');

describe('Category Model', () => {
  let sequelize;
  let Category;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:?cache=shared', { logging: false });
    
    Category = CategoryModel.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'category',
    });

    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('should create a new category', async () => {
    const category = await Category.create({ category_name: 'Electronics' });
    expect(category.id).toBeDefined();
    expect(category.category_name).toBe('Electronics');
  });

});
