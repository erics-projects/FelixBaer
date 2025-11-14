'use client';

import { memo, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { colors, typography } from '@/styles/tokens';
import { Button, TextField, Checkbox } from '@/components';

export interface ContactProps {
  className?: string;
  onSubmit?: (data: ContactFormData) => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  privacyAccepted: boolean;
}

const Contact = memo<ContactProps>(({ className, onSubmit }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    privacyAccepted: false
  });

  const handleStringChange = useCallback((field: 'name' | 'email' | 'message') => (
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleBooleanChange = useCallback((field: 'privacyAccepted') => (
    value: boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  }, [formData, onSubmit]);

  return (
    <div className={cn("w-full relative", className)} style={{ paddingTop: '120px', paddingBottom: '64px' }}>
      {/* Smooth transition edge extending into previous component */}
      <div
        className="absolute left-0 w-full pointer-events-none"
        style={{
          top: '-40px',
          height: '100px',
          background: 'linear-gradient(to top, rgba(128,128,128,0.12) 0%, rgba(128,128,128,0.08) 30%, rgba(128,128,128,0.04) 70%, transparent 100%)',
          zIndex: 1,
        }}
      />
      
      <div className="flex flex-col items-center justify-between gap-14 h-full relative z-10">
        {/* Main Content */}
        <div className="flex flex-col items-center gap-16">
          {/* Title Section */}
          <div className="text-center" style={{ maxWidth: '1059px' }}>
            <h2 
              className="mb-8"
              style={{
                fontSize: '28px',
                fontFamily: typography.textStyles.body.fontFamily,
                fontWeight: 600,
                lineHeight: '1.175em',
                color: colors.text.primary,
              }}
            >
              Was kann ich für dich tun?
            </h2>
            <h3
              style={{
                fontSize: '88px',
                fontFamily: typography.fontFamilies.decorative,
                fontWeight: 400,
                lineHeight: '1.15em',
                color: colors.text.secondary,
                textAlign: 'center',
              }}
            >
              Schreib eine Nachricht
            </h3>
          </div>

          {/* Contact Form */}
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col items-end gap-8"
            style={{ width: '787px' }}
          >
            {/* Input Fields */}
            <div className="w-full flex flex-col gap-6">
              {/* First Row - Name and Email */}
              <div className="flex gap-6">
                <div style={{ width: '382px' }}>
                  <TextField
                    label="Name"
                    placeholder="Name eintragen"
                    value={formData.name}
                    onChange={handleStringChange('name')}
                  />
                </div>
                <div style={{ width: '381px' }}>
                  <TextField
                    label="E-Mail Adresse"
                    type="email"
                    placeholder="E-Mail eintragen"
                    value={formData.email}
                    onChange={handleStringChange('email')}
                  />
                </div>
              </div>

              {/* Message Field - Using textarea directly since TextField doesn't support multiline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label
                  style={{
                    fontFamily: typography.textStyles.label?.fontFamily || typography.textStyles.body.fontFamily,
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '1.17em',
                    color: colors.text.primary,
                  }}
                >
                  Nachricht
                </label>
                <textarea
                  placeholder="Nachricht eintragen"
                  value={formData.message}
                  onChange={(e) => handleStringChange('message')(e.target.value)}
                  rows={4}
                  style={{
                    fontFamily: typography.textStyles.body.fontFamily,
                    fontWeight: 300,
                    fontSize: '20px',
                    lineHeight: '1.3em',
                    color: colors.text.primary,
                    backgroundColor: colors.background.primary,
                    border: 'none',
                    borderBottom: `2px solid ${colors.text.primary}`,
                    borderRadius: '4px',
                    padding: '20px 16px',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '160px',
                    width: '100%',
                  }}
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className="w-full">
              <Checkbox
                checked={formData.privacyAccepted}
                onChange={handleBooleanChange('privacyAccepted')}
                label="Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu."
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={() => {
                // Handle form submission via onClick instead of form submit
                if (onSubmit) {
                  onSubmit(formData);
                }
              }}
              variant="primary"
            >
              senden
            </Button>
          </form>
        </div>

        {/* Footer */}
        <footer 
          className="flex justify-between items-center px-16 pb-16"
          style={{ width: '1728px', gap: '787px' }}
        >
          {/* Email Section */}
          <div className="flex flex-col gap-3" style={{ width: '271px' }}>
            <h4
              style={{
                fontSize: '16px',
                fontFamily: typography.textStyles.body.fontFamily,
                fontWeight: 700,
                lineHeight: '1.175em',
                letterSpacing: '1.5%',
                color: colors.text.secondary,
              }}
            >
              E-MAIL
            </h4>
            <a
              href="mailto:beispiel@email.com"
              style={{
                fontSize: '24px',
                fontFamily: typography.textStyles.body.fontFamily,
                fontWeight: 300,
                lineHeight: '1.175em',
                letterSpacing: '1.5%',
                color: colors.text.secondary,
                textDecoration: 'none',
              }}
            >
              beispiel@email.com
            </a>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col gap-3">
            <h4
              style={{
                fontSize: '16px',
                fontFamily: typography.textStyles.body.fontFamily,
                fontWeight: 700,
                lineHeight: '1.175em',
                letterSpacing: '1.5%',
                color: colors.text.secondary,
              }}
            >
              RECHTLICHES
            </h4>
            <nav className="flex gap-12">
              {[
                { label: 'Impressum', href: '/impressum' },
                { label: 'Datenschutz', href: '/datenschutz' },
                { label: 'Cookie-Hinweis', href: '/cookie-hinweis' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2.5"
                  style={{
                    fontSize: '24px',
                    fontFamily: typography.textStyles.body.fontFamily,
                    fontWeight: 300,
                    lineHeight: '1.175em',
                    letterSpacing: '1.5%',
                    color: colors.text.secondary,
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
});

Contact.displayName = 'Contact';

export default Contact;