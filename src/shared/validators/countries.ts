export const countries = [
  { value: 'AF', label: 'Afghanistan', code: '^\\d{4}$', example: '1001' },
  { value: 'DZ', label: 'Algeria', code: '^\\d{5}$', example: '16000' },
  { value: 'AO', label: 'Angola', code: '^\\d{4}$', example: '1101' },
  { value: 'AR', label: 'Argentina', code: '^[A-Z]?\\d{4}[A-Z]{3}$', example: 'C1000AAO' },
  { value: 'AU', label: 'Australia', code: '^\\d{4}$', example: '2000' },
  { value: 'AT', label: 'Austria', code: '^\\d{4}$', example: '1010' },
  { value: 'AZ', label: 'Azerbaijan', code: '^AZ\\d{4}$', example: 'AZ1000' },
  { value: 'BH', label: 'Bahrain', code: '^\\d{3}$', example: '301' },
  { value: 'BD', label: 'Bangladesh', code: '^\\d{4}$', example: '1000' },
  { value: 'BY', label: 'Belarus', code: '^\\d{6}$', example: '123456' },
  { value: 'BE', label: 'Belgium', code: '^\\d{4}$', example: '1000' },
  { value: 'BJ', label: 'Benin', code: '^\\d{2}\\s?BP\\s?\\d{3}$', example: '01 BP 200' },
  { value: 'BR', label: 'Brazil', code: '^\\d{5}-\\d{3}$', example: '12345-678' },
  { value: 'BG', label: 'Bulgaria', code: '^\\d{4}$', example: '1000' },
  { value: 'BF', label: 'Burkina Faso', code: '^\\d{2}$', example: '01' },
  { value: 'BI', label: 'Burundi', code: '^\\d{4}$', example: '1234' },
  { value: 'KH', label: 'Cambodia', code: '^\\d{5}$', example: '12000' },
  { value: 'CM', label: 'Cameroon', code: '^\\d{4}$', example: '1000' },
  { value: 'CA', label: 'Canada', code: '^[A-Za-z]\\d[A-Za-z]\\s?\\d[A-Za-z]\\d$', example: 'A1B 2C3' },
  { value: 'TD', label: 'Chad', code: '^\\d{4}$', example: '1234' },
  { value: 'CL', label: 'Chile', code: '^\\d{7}$', example: '8320000' },
  { value: 'CN', label: 'China', code: '^\\d{6}$', example: '100000' },
  { value: 'CO', label: 'Colombia', code: '^\\d{6}$', example: '110111' },
  { value: 'CD', label: 'Congo', code: '^\\d{4}$', example: '1234' },
  { value: 'CR', label: 'Costa Rica', code: '^\\d{5}$', example: '10101' },
  { value: 'CI', label: 'Côte d\'Ivoire', code: '^\\d{2}$', example: '01' },
  { value: 'CU', label: 'Cuba', code: '^\\d{5}$', example: '10100' },
  { value: 'CY', label: 'Cyprus', code: '^\\d{4}$', example: '1010' },
  { value: 'CZ', label: 'Czechia', code: '^\\d{3}\\s?\\d{2}$', example: '110 00' },
  { value: 'DK', label: 'Denmark', code: '^\\d{4}$', example: '1000' },
  { value: 'DO', label: 'Dominican Republic', code: '^\\d{5}$', example: '10101' },
  { value: 'EC', label: 'Ecuador', code: '^\\d{6}$', example: '170150' },
  { value: 'EG', label: 'Egypt', code: '^\\d{5}$', example: '11511' },
  { value: 'SV', label: 'El Salvador', code: '^\\d{4}$', example: '1101' },
  { value: 'ET', label: 'Ethiopia', code: '^\\d{4}$', example: '1000' },
  { value: 'FI', label: 'Finland', code: '^\\d{5}$', example: '00100' },
  { value: 'FR', label: 'France', code: '^\\d{5}$', example: '75001' },
  { value: 'GE', label: 'Georgia', code: '^\\d{4}$', example: '0101' },
  { value: 'DE', label: 'Germany', code: '^\\d{5}$', example: '10115' },
  { value: 'GH', label: 'Ghana', code: '^[A-Za-z]{2}-\\d{4}$', example: 'GA-1234' },
  { value: 'GR', label: 'Greece', code: '^\\d{3}\\s?\\d{2}$', example: '101 88' },
  { value: 'GT', label: 'Guatemala', code: '^\\d{5}$', example: '01001' },
  { value: 'GN', label: 'Guinea', code: '^\\d{3}$', example: '123' },
  { value: 'HT', label: 'Haiti', code: '^\\d{4}$', example: '6110' },
  { value: 'HN', label: 'Honduras', code: '^\\d{5}$', example: '11101' },
  { value: 'HU', label: 'Hungary', code: '^\\d{4}$', example: '1011' },
  { value: 'IN', label: 'India', code: '^\\d{6}$', example: '110001' },
  { value: 'ID', label: 'Indonesia', code: '^\\d{5}$', example: '10110' },
  { value: 'IR', label: 'Iran', code: '^\\d{10}$', example: '0123456789' },
  { value: 'IQ', label: 'Iraq', code: '^\\d{5}$', example: '10001' },
  { value: 'IE', label: 'Ireland', code: '^[A-Za-z0-9]{3}\\s?[A-Za-z0-9]{4}$', example: 'D01 F5X2' },
  { value: 'IL', label: 'Israel', code: '^\\d{7}$', example: '1234567' },
  { value: 'IT', label: 'Italy', code: '^\\d{5}$', example: '00100' },
  { value: 'JP', label: 'Japan', code: '^\\d{3}-\\d{4}$', example: '123-4567' },
  { value: 'JO', label: 'Jordan', code: '^\\d{5}$', example: '11118' },
  { value: 'KZ', label: 'Kazakhstan', code: '^\\d{6}$', example: '123456' },
  { value: 'KE', label: 'Kenya', code: '^\\d{5}$', example: '00100' },
  { value: 'KW', label: 'Kuwait', code: '^\\d{5}$', example: '13001' },
  { value: 'KG', label: 'Kyrgyzstan', code: '^\\d{6}$', example: '720301' },
  { value: 'LA', label: 'Lao People\'s Democratic Republic', code: '^\\d{5}$', example: '12345' },
  { value: 'LY', label: 'Libya', code: '^\\d{5}$', example: '12345' },
  { value: 'MG', label: 'Madagascar', code: '^\\d{3}$', example: '103' },
  { value: 'MW', label: 'Malawi', code: '^\\d{4}$', example: '1234' },
  { value: 'MY', label: 'Malaysia', code: '^\\d{5}$', example: '50088' },
  { value: 'ML', label: 'Mali', code: '^\\d{4}$', example: '1234' },
  { value: 'MX', label: 'Mexico', code: '^\\d{5}$', example: '12345' },
  { value: 'MA', label: 'Morocco', code: '^\\d{5}$', example: '10000' },
  { value: 'MZ', label: 'Mozambique', code: '^\\d{4}$', example: '1234' },
  { value: 'MM', label: 'Myanmar', code: '^\\d{5}$', example: '11181' },
  { value: 'NP', label: 'Nepal', code: '^\\d{5}$', example: '44600' },
  { value: 'NL', label: 'Netherlands', code: '^\\d{4}[ ]?[A-Za-z]{2}$', example: '1234 AB' },
  { value: 'NZ', label: 'New Zealand', code: '^\\d{4}$', example: '1010' },
  { value: 'NI', label: 'Niger', code: '^\\d{4}$', example: '1234' },
  { value: 'NG', label: 'Nigeria', code: '^\\d{6}$', example: '123456' },
  { value: 'NO', label: 'Norway', code: '^\\d{4}$', example: '1234' },
  { value: 'OM', label: 'Oman', code: '^\\d{3}$', example: '123' },
  { value: 'PK', label: 'Pakistan', code: '^\\d{5}$', example: '74200' },
  { value: 'PS', label: 'Palestine', code: '^\\d{4}$', example: '1234' },
  { value: 'PG', label: 'Papua New Guinea', code: '^\\d{3}$', example: '111' },
  { value: 'PE', label: 'Peru', code: '^\\d{5}$', example: '12345' },
  { value: 'PH', label: 'Philippines', code: '^\\d{4}$', example: '1000' },
  { value: 'PL', label: 'Poland', code: '^\\d{2}-\\d{3}$', example: '02-401' },
  { value: 'QA', label: 'Qatar', code: '^\\d{5}$', example: '12345' },
  { value: 'RU', label: 'Russia', code: '^\\d{6}$', example: '102046' },
  { value: 'RW', label: 'Rwanda', code: '^\\d{2}$', example: '01' },
  { value: 'SA', label: 'Saudi Arabia', code: '^\\d{5}$', example: '12141' },
  { value: 'SN', label: 'Senegal', code: '^\\d{5}$', example: '12500' },
  { value: 'RS', label: 'Serbia', code: '^\\d{5}$', example: '11000' },
  { value: 'SG', label: 'Singapore', code: '^\\d{6}$', example: '018956' },
  { value: 'SO', label: 'Somalia', code: '^\\d{5}$', example: '12345' },
  { value: 'ZA', label: 'South Africa', code: '^\\d{4}$', example: '0001' },
  { value: 'ES', label: 'Spain', code: '^\\d{5}$', example: '28001' },
  { value: 'LK', label: 'Sri Lanka', code: '^\\d{5}$', example: '00100' },
  { value: 'SD', label: 'Sudan', code: '^\\d{5}$', example: '11111' },
  { value: 'SE', label: 'Sweden', code: '^\\d{3}[ ]?\\d{2}$', example: '123 45' },
  { value: 'CH', label: 'Switzerland', code: '^\\d{4}$', example: '8001' },
  { value: 'SY', label: 'Syrian Arab Republic', code: '^\\d{4}$', example: '1234' },
  { value: 'TJ', label: 'Tajikistan', code: '^\\d{6}$', example: '734001' },
  { value: 'TZ', label: 'Tanzania', code: '^\\d{5}$', example: '11101' },
  { value: 'TH', label: 'Thailand', code: '^\\d{5}$', example: '10100' },
  { value: 'TN', label: 'Tunisia', code: '^\\d{4}$', example: '1000' },
  { value: 'TR', label: 'Turkey', code: '^\\d{5}$', example: '34000' },
  { value: 'UG', label: 'Uganda', code: '^\\d{5}$', example: '12345' },
  { value: 'UA', label: 'Ukraine', code: '^\\d{5}$', example: '01001' },
  { value: 'AE', label: 'United Arab Emirates', code: '^\\d{5}$', example: '12345' },
  { value: 'GB', label: 'United Kingdom', code: '^[A-Z]{1,2}[0-9][A-Z0-9]?\\s?[0-9][A-Z]{2}$', example: 'SW1A 0AA' },
  { value: 'US', label: 'United States', code: '^\\d{5}(-\\d{4})?$', example: '12345 or 12345-6789' },
  { value: 'UZ', label: 'Uzbekistan', code: '^\\d{6}$', example: '100000' },
  { value: 'VE', label: 'Venezuela', code: '^\\d{4}$', example: '1011' },
  { value: 'VN', label: 'Vietnam', code: '^\\d{6}$', example: '100000' },
  { value: 'YE', label: 'Yemen', code: '^\\d{5}$', example: '12345' },
  { value: 'ZM', label: 'Zambia', code: '^\\d{5}$', example: '10101' },
  { value: 'ZW', label: 'Zimbabwe', code: '^\\d{4}$', example: '1234' },
]
