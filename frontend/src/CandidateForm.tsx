import React, { useState } from 'react';
import './CandidateForm.css';

interface CandidateFormProps {
    onClose: () => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        education: '',
        workExperience: ''
    });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCvFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        // Basic front-end validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.education || !formData.workExperience) {
            setError('Please fill out all required fields.');
            setLoading(false);
            return;
        }

        if (!cvFile) {
            setError('Please upload your CV.');
            setLoading(false);
            return;
        }

        try {
            const uploadData = new FormData();
            uploadData.append('firstName', formData.firstName);
            uploadData.append('lastName', formData.lastName);
            uploadData.append('email', formData.email);
            uploadData.append('phone', formData.phone);
            uploadData.append('address', formData.address);
            uploadData.append('education', formData.education);
            uploadData.append('workExperience', formData.workExperience);
            uploadData.append('cv', cvFile);

            const res = await fetch('http://localhost:3010/api/candidates', {
                method: 'POST',
                body: uploadData,
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Ups! Algo salió mal enviando la solicitud.');
            } else {
                setSuccessMsg('¡Candidato añadido con éxito al sistema ATS!');
                // Reset form fields
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                    education: '',
                    workExperience: ''
                });
                setCvFile(null);
            }
        } catch (err: any) {
             setError('Error de conexión con el servidor. Inténtalo de nuevo.');
        } finally {
             setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Añadir Candidato</h2>
                {error && <div className="error-alert">{error}</div>}
                {successMsg && <div className="success-alert">{successMsg}</div>}
                
                <form onSubmit={handleSubmit} className="candidate-form">
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Nombre *</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Apellidos *</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Correo Electrónico (Email) *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Teléfono *</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Dirección *</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Educación *</label>
                        <textarea name="education" value={formData.education} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Experiencia Laboral *</label>
                        <textarea name="workExperience" value={formData.workExperience} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Cargar CV (PDF, DOCX) *</label>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Añadir Candidato'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CandidateForm;