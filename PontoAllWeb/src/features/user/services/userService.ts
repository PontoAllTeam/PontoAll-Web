import { User } from '@/types';
import generateGenericMethods from '@/utils/serviceUtils';

const genericMethods = generateGenericMethods<User>('User');

const UserService = {
  ...genericMethods,
};

export default UserService;
