/**
 * Property Valuation Application - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFormValidation();
    initTooltips();
    initAutoSave();
    initAddressAutocomplete();
});

/**
 * Form Validation Enhancement
 */
function initFormValidation() {
    const form = document.getElementById('valuationForm');
    if (!form) return;

    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            // Clear error state on input
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
            }
        });
    });

    // Form submission handling
    form.addEventListener('submit', function(e) {
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            // Scroll to first error
            const firstError = form.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
}

/**
 * Validate individual form field
 */
function validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required') ||
                       field.closest('.mb-3')?.querySelector('.text-danger');

    // Skip optional fields that are empty
    if (!isRequired && !value) {
        return true;
    }

    let isValid = true;
    let errorMessage = '';

    // Check required
    if (isRequired && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Field-specific validation
    if (value && isValid) {
        switch (field.name) {
            case 'zip_code':
                if (!/^\d{5}(-\d{4})?$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Invalid ZIP code format';
                }
                break;

            case 'square_footage':
                const sqft = parseInt(value);
                if (sqft < 100 || sqft > 100000) {
                    isValid = false;
                    errorMessage = 'Must be between 100 and 100,000';
                }
                break;

            case 'bedrooms':
                const beds = parseInt(value);
                if (beds < 0 || beds > 50) {
                    isValid = false;
                    errorMessage = 'Must be between 0 and 50';
                }
                break;

            case 'bathrooms':
                const baths = parseFloat(value);
                if (baths < 0.5 || baths > 50) {
                    isValid = false;
                    errorMessage = 'Must be between 0.5 and 50';
                }
                break;

            case 'year_built':
                if (value) {
                    const year = parseInt(value);
                    if (year < 1800 || year > 2030) {
                        isValid = false;
                        errorMessage = 'Must be between 1800 and 2030';
                    }
                }
                break;

            case 'price_per_sqft_6mo':
            case 'price_per_sqft_12mo':
                const price = parseFloat(value);
                if (price < 1 || price > 10000) {
                    isValid = false;
                    errorMessage = 'Must be between $1 and $10,000';
                }
                break;
        }
    }

    // Update UI
    if (!isValid) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');

        // Update or create error message
        let feedback = field.nextElementSibling;
        if (!feedback?.classList.contains('invalid-feedback')) {
            feedback = field.parentElement.querySelector('.invalid-feedback');
        }
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            field.parentElement.appendChild(feedback);
        }
        feedback.textContent = errorMessage;
    } else if (value) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    }

    return isValid;
}

/**
 * Initialize Bootstrap tooltips
 */
function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
}

/**
 * Auto-save form data to localStorage
 */
function initAutoSave() {
    const form = document.getElementById('valuationForm');
    if (!form) return;

    const STORAGE_KEY = 'property_valuation_draft';

    // Load saved data
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && !field.value) {
                    field.value = data[key];
                }
            });

            // Show notification
            showNotification('Draft restored from your previous session', 'info');
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }

    // Save on input
    let saveTimeout;
    form.addEventListener('input', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                if (value && key !== 'csrf_token') {
                    data[key] = value;
                }
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }, 1000);
    });

    // Clear on successful submit
    form.addEventListener('submit', function() {
        localStorage.removeItem(STORAGE_KEY);
    });

    // Add clear draft button
    const resetBtn = form.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            localStorage.removeItem(STORAGE_KEY);
        });
    }
}

/**
 * Simple address autocomplete using placeholder functionality
 * In production, this could integrate with Google Places API
 */
function initAddressAutocomplete() {
    const addressField = document.querySelector('[name="street_address"]');
    if (!addressField) return;

    // Add helpful formatting hints
    addressField.addEventListener('blur', function() {
        let value = this.value.trim();

        // Capitalize first letter of each word
        if (value) {
            value = value.replace(/\b\w/g, l => l.toUpperCase());
            this.value = value;
        }
    });
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info') {
    // Create toast container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '1100';
        document.body.appendChild(container);
    }

    // Create toast
    const toastId = 'toast-' + Date.now();
    const bgClass = {
        'info': 'bg-info',
        'success': 'bg-success',
        'warning': 'bg-warning',
        'error': 'bg-danger'
    }[type] || 'bg-info';

    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast ${bgClass} text-white`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast"></button>
        </div>
    `;

    container.appendChild(toast);

    // Show toast
    const bsToast = new bootstrap.Toast(toast, { delay: 5000 });
    bsToast.show();

    // Remove from DOM after hidden
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
}

/**
 * Format number as currency
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

/**
 * Format number with commas
 */
function formatNumber(value) {
    return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Fetch external estimates via API (optional enhancement)
 */
async function fetchExternalEstimates(address) {
    try {
        const response = await fetch('/api/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch estimates');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching estimates:', error);
        return null;
    }
}

/**
 * Confirm deletion modal handler
 */
function confirmDelete(valuationId, address) {
    document.getElementById('deleteAddress').textContent = address;
    document.getElementById('deleteForm').action = `/valuation/${valuationId}/delete`;

    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
}

// Export functions for use in templates
window.PropertyValuation = {
    formatCurrency,
    formatNumber,
    showNotification,
    fetchExternalEstimates,
    confirmDelete
};
