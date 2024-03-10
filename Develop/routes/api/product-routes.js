const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const productData = await Product.findAll({
      include: [{model: Category}, {model: Tag, through: ProductTag }],
    });
  // be sure to include its associated Category and Tag data
  res.status(200).json(productData);
} catch (err) {
 res.status(500).json(err);
}
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
  // be sure to include its associated Category and Tag data
  if (!productData) {
    res.status(404).json({ message: 'No product found with this id!' });
    return;
  }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
      const product = await Product.create(req.body)
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        await ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json(err);
    }
    });

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

      if (req.body.tagIds) {
      const existingTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      const existingTagIds = existingTags.map((tag) => tag.tag_id);
      const newTags = req.body.tagIds.filter((tag_id) => !existingTagIds.includes(tag_id));
      const tagsToRemove = existingTags.filter((tag) => !req.body.tagIds.includes(tag.tag_id));

      await ProductTag.destroy({ where: { id: tagsToRemove.map(tag => tag.id) } });
      await ProductTag.bulkCreate(newTags.map(tag_id => ({ product_id: req.params.id, tag_id })));
    }
          // create filtered list of new tag_ids
          const updatedProduct = await Product.findByPk(req.params.id, {
            include: [{ model: Category }, { model: Tag, through: ProductTag }],
          });
          res.status(200).json(updatedProduct);
        } catch (err) {
          res.status(400).json(err);
        }
      });

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const result = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!result) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Product deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
