import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import {
  defineMethod,
  removeItMethod,
  updateMethodCategory,
} from '../../api/base/BaseCollection.methods';
import { Categories } from '../../api/category/CategoryCollection';

const CategoryManagementModal = ({ show, action, category, onClose }) => {
  const [updatedCategory, setUpdatedCategory] = useState(category);

  useEffect(() => {
    setUpdatedCategory(category);
  }, [category]);

  const handleSaveChanges = () => {
    const collectionName = Categories.getCollectionName();

    if (action === 'delete') {
      removeItMethod
        .callPromise({ collectionName, instance: category._id })
        .then(() => {
          swal('Success', 'Category deleted successfully', 'success');
          onClose();
        })
        .catch((error) => swal('Error', error.message, 'error'));
    } else if (action === 'edit') {
      const updateData = {
        categoryName: category.category, // Current category name
        newCategory: updatedCategory.category, // New category name
      };

      updateMethodCategory
        .callPromise({ collectionName, updateData })
        .then(() => {
          swal('Success', 'Category updated successfully', 'success');
          onClose();
        })
        .catch((error) => swal('Error', error.message, 'error'));
    } else if (action === 'add') {
      const newCategoryData = {
        category: updatedCategory.category,
      };

      defineMethod
        .callPromise({ collectionName, definitionData: newCategoryData })
        .then(() => {
          swal('Success', 'Category added successfully', 'success');
          onClose();
        })
        .catch((error) => swal('Error', error.message, 'error'));
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {(() => {
            switch (action) {
            case 'delete':
              return 'Delete Category';
            case 'edit':
              return 'Edit Category';
            default:
              return 'Add Category';
            }
          })()}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {action === 'delete' ? (
          <>
            <span className="d-flex align-items-center">
              <ExclamationTriangleFill color="red" size="10%" />
              <h5>Delete this category?</h5>
            </span>
            <hr />
            <h4>Category</h4>
            <p>{category.category}</p>
          </>
        ) : (
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={updatedCategory.category || ''}
              onChange={(e) => setUpdatedCategory({
                ...updatedCategory,
                category: e.target.value,
              })}
            />
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        {action === 'delete' ? (
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSaveChanges}>
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={action === 'add' ? 'success' : 'primary'}
              onClick={handleSaveChanges}
            >
              {action === 'add' ? 'Add Category' : 'Save Changes'}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

CategoryManagementModal.propTypes = {
  show: PropTypes.bool.isRequired,
  action: PropTypes.string.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

CategoryManagementModal.defaultProps = {
  category: null,
};

export default CategoryManagementModal;
