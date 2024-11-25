import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Link,
} from '@react-email/components';

interface EmailTemplateProps {
  paperId: string;
  paperTitle: string;
  abstract: string;
  author: {
    name: string;
    email: string;
    mobileNumber: string;
    designation: string;
    institute: string;
  };
  coAuthors: Array<{
    name: string;
    email: string;
    designation: string;
    institute: string;
  }>;
  fileUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  paperId,
  paperTitle,
  abstract,
  author,
  coAuthors,
  fileUrl,
}) => (
  <Html>
    <Head />
    <Preview>Research Paper Submission Confirmation</Preview>
    <Body style={{
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}>
      <Container style={{ padding: '20px', maxWidth: '600px' }}>
        <Heading style={{ textAlign: 'center', color: '#1a1a1a' }}>
          Research Paper Submission Confirmation
        </Heading>

        <Section style={{ marginTop: '24px' }}>
          <Heading as="h2" style={{ fontSize: '20px', color: '#2d2d2d' }}>
            Paper Details
          </Heading>
          <Text style={{ margin: '10px 0' }}>
            <strong>Title:</strong> {paperId}
          </Text>
          <Text style={{ margin: '10px 0' }}>
            <strong>Title:</strong> {paperTitle}
          </Text>
          <Text style={{ margin: '10px 0' }}>
            <strong>Abstract:</strong> {abstract}
          </Text>
        </Section>

        <Hr style={{ margin: '20px 0' }} />

        <Section>
          <Heading as="h2" style={{ fontSize: '20px', color: '#2d2d2d' }}>
            Author Information
          </Heading>
          <Text style={{ margin: '8px 0' }}><strong>Name:</strong> {author.name}</Text>
          <Text style={{ margin: '8px 0' }}><strong>Email:</strong> {author.email}</Text>
          <Text style={{ margin: '8px 0' }}><strong>Mobile:</strong> {author.mobileNumber}</Text>
          <Text style={{ margin: '8px 0' }}><strong>Designation:</strong> {author.designation}</Text>
          <Text style={{ margin: '8px 0' }}><strong>Institute:</strong> {author.institute}</Text>
        </Section>

        {coAuthors.length > 0 && (
          <>
            <Hr style={{ margin: '20px 0' }} />
            <Section>
              <Heading as="h2" style={{ fontSize: '20px', color: '#2d2d2d' }}>
                Co-Authors
              </Heading>
              {coAuthors.map((coAuthor, index) => (
                <div key={index} style={{ 
                  marginBottom: '15px',
                  paddingLeft: '15px',
                  borderLeft: '3px solid #eaeaea'
                }}>
                  <Text style={{ margin: '5px 0' }}><strong>Name:</strong> {coAuthor.name}</Text>
                  <Text style={{ margin: '5px 0' }}><strong>Designation:</strong> {coAuthor.designation}</Text>
                </div>
              ))}
            </Section>
          </>
        )}

        <Hr style={{ margin: '20px 0' }} />

        <Section>
          <Heading as="h2" style={{ fontSize: '20px', color: '#2d2d2d' }}>
            Paper File
          </Heading>
          <Text>You can access your submitted paper using the following link:</Text>
          <Link
            href={fileUrl}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#0066cc',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            View Paper
          </Link>
        </Section>

        <Hr style={{ margin: '20px 0' }} />

        <Text style={{ 
          textAlign: 'center',
          color: '#666666',
          fontSize: '14px',
        }}>
          Thank you for your submission. If you have any questions, please don&apos;t hesitate to contact us.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;
