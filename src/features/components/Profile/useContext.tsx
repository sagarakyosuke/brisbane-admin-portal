import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';

// -----------------------------------------------------------------------------
// Profile Avatar Types
// -----------------------------------------------------------------------------

export type ProfileAvatarProps = {
  src?: string;
  alt: string;
  initials: string;
  online?: boolean;
  active?: boolean;
  size?: number;
};

type ProfileContextType = {
  imageFailed: boolean;
  handleImageError: () => void;
};

// -----------------------------------------------------------------------------
// Profile Avatar Context
// -----------------------------------------------------------------------------

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({
  children,
  src
}: {
  children: ReactNode;
  src?: string;
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const handleImageError = () => {
    setImageFailed(true);
  };

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  return (
    <ProfileContext.Provider
      value={{
        imageFailed,
        handleImageError
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileAvatar = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfileAvatar must be used within a ProfileProvider');
  }

  return context;
};

// -----------------------------------------------------------------------------
// Profile Menu Context
// -----------------------------------------------------------------------------

type ProfileMenuContextType = {
  open: boolean;
  tooltipOpen: boolean;
  menuId: string;
  handleToggle: () => void;
  handleClose: () => void;
  handleTooltipOpen: () => void;
  handleTooltipClose: () => void;
};

const ProfileMenuContext = createContext<ProfileMenuContextType | undefined>(
  undefined
);

export const ProfileMenuProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const menuId = 'profile-menu';

  const handleToggle = () => {
    setTooltipOpen(false);
    setOpen((previous) => !previous);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <ProfileMenuContext.Provider
      value={{
        open,
        tooltipOpen,
        menuId,
        handleToggle,
        handleClose,
        handleTooltipOpen,
        handleTooltipClose
      }}
    >
      {children}
    </ProfileMenuContext.Provider>
  );
};

export const useProfileMenu = () => {
  const context = useContext(ProfileMenuContext);

  if (!context) {
    throw new Error('useProfileMenu must be used within a ProfileMenuProvider');
  }

  return context;
};
