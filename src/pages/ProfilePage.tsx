/* ==========================================================================
   InfraMaturity - User Profile & Account Page
   Dedicated authenticated hub housing personal info, repository search history,
   saved repositories, and account security.
   ========================================================================== */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  User as UserIcon,
  Clock,
  Bookmark,
  BookmarkCheck,
  Shield,
  LogOut,
  Save,
  CheckCircle2,
  AlertCircle,
  Building,
  Mail,
  AtSign,
  Search,
  Trash2,
  ExternalLink,
  RotateCcw,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.tsx';
import { useRepositoryStore } from '../hooks/useRepositoryStore.ts';
import { StatusBadge } from '../components/common/StatusBadge.tsx';
import { EmptyState } from '../components/common/EmptyState.tsx';

type ProfileTab = 'personal' | 'history' | 'saved' | 'account';

export function ProfilePage() {
  const { user, updateProfile, logout, authMode } = useAuth();
  const {
    history,
    savedRepos,
    toggleBookmark,
    deleteHistoryItem,
    clearHistory,
    deleteSavedRepo,
    checkIsSaved,
  } = useRepositoryStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab') as ProfileTab | null;

  const [activeTab, setActiveTab] = useState<ProfileTab>(() => {
    if (tabParam && ['personal', 'history', 'saved', 'account'].includes(tabParam)) {
      return tabParam;
    }
    return 'personal';
  });

  useEffect(() => {
    if (tabParam && ['personal', 'history', 'saved', 'account'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Personal Info Form State
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [organization, setOrganization] = useState(user?.organization || '');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // History & Saved Filter States
  const [historyFilter, setHistoryFilter] = useState('');
  const [savedFilter, setSavedFilter] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);

    if (!fullName.trim()) {
      setSaveError('Full name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setSaveError('A valid email address is required.');
      return;
    }

    const res = await updateProfile({
      name: fullName,
      email,
      username,
      organization,
    });

    if (res.success) {
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setSaveError(res.error || 'Failed to update profile.');
    }
  };

  const handleCancelEdit = () => {
    setFullName(user?.name || '');
    setEmail(user?.email || '');
    setUsername(user?.username || '');
    setOrganization(user?.organization || '');
    setIsEditing(false);
    setSaveError(null);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3500);
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const filteredHistory = history.filter((item) => {
    const term = historyFilter.toLowerCase();
    return (
      item.repositoryName.toLowerCase().includes(term) ||
      item.owner.toLowerCase().includes(term) ||
      item.repositoryUrl.toLowerCase().includes(term)
    );
  });

  const filteredSaved = savedRepos.filter((item) => {
    const term = savedFilter.toLowerCase();
    return (
      item.repositoryName.toLowerCase().includes(term) ||
      item.owner.toLowerCase().includes(term) ||
      item.repositoryUrl.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ padding: 'var(--space-8) 0 var(--space-16)', backgroundColor: 'var(--surface-soft)' }}>
      <div className="container">
        {/* Profile Header */}
        <div
          className="card"
          style={{
            marginBottom: 'var(--space-8)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--navy-900)',
              color: 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 'var(--text-2xl)', color: 'var(--navy-950)', marginBottom: 'var(--space-1)' }}>
              {user?.name || 'Engineer Profile'}
            </h1>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Mail size={13} />
                <span>{user?.email}</span>
              </span>
              {user?.organization && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Building size={13} />
                  <span>{user.organization}</span>
                </span>
              )}
              <span className="font-mono" style={{ color: 'var(--text-muted)' }}>
                Provider: {authMode.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Tabbed Layout: Sidebar + Main Content */}
        <div className="profile-layout-grid">
          {/* Navigation Sidebar */}
          <div className="card" style={{ padding: 'var(--space-3)' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <button
                onClick={() => handleTabChange('personal')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: activeTab === 'personal' ? 600 : 500,
                  backgroundColor: activeTab === 'personal' ? 'var(--surface-soft)' : 'transparent',
                  color: activeTab === 'personal' ? 'var(--navy-950)' : 'var(--text-secondary)',
                  borderLeft: activeTab === 'personal' ? '3px solid var(--accent-amber)' : '3px solid transparent',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <UserIcon size={16} />
                <span>Personal Information</span>
              </button>

              <button
                onClick={() => handleTabChange('history')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: activeTab === 'history' ? 600 : 500,
                  backgroundColor: activeTab === 'history' ? 'var(--surface-soft)' : 'transparent',
                  color: activeTab === 'history' ? 'var(--navy-950)' : 'var(--text-secondary)',
                  borderLeft: activeTab === 'history' ? '3px solid var(--accent-amber)' : '3px solid transparent',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <Clock size={16} />
                <span>Repository History ({history.length})</span>
              </button>

              <button
                onClick={() => handleTabChange('saved')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: activeTab === 'saved' ? 600 : 500,
                  backgroundColor: activeTab === 'saved' ? 'var(--surface-soft)' : 'transparent',
                  color: activeTab === 'saved' ? 'var(--navy-950)' : 'var(--text-secondary)',
                  borderLeft: activeTab === 'saved' ? '3px solid var(--accent-amber)' : '3px solid transparent',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <Bookmark size={16} />
                <span>Saved Repositories ({savedRepos.length})</span>
              </button>

              <button
                onClick={() => handleTabChange('account')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: activeTab === 'account' ? 600 : 500,
                  backgroundColor: activeTab === 'account' ? 'var(--surface-soft)' : 'transparent',
                  color: activeTab === 'account' ? 'var(--navy-950)' : 'var(--text-secondary)',
                  borderLeft: activeTab === 'account' ? '3px solid var(--accent-amber)' : '3px solid transparent',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <Shield size={16} />
                <span>Account & Security</span>
              </button>
            </nav>

            <div
              style={{
                marginTop: 'var(--space-4)',
                paddingTop: 'var(--space-3)',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <button
                onClick={handleSignOut}
                className="btn btn-danger btn-sm"
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Main Tab Panel */}
          <div>
            {/* TAB 1: Personal Information */}
            {activeTab === 'personal' && (
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    <UserIcon size={18} color="var(--accent-amber-dark)" />
                    <span>Personal Information</span>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-outline btn-sm"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {saveSuccess && (
                  <div className="alert alert-success" style={{ marginBottom: 'var(--space-4)' }}>
                    <CheckCircle2 size={16} />
                    <span>Profile details updated successfully.</span>
                  </div>
                )}

                {saveError && (
                  <div className="alert alert-error" style={{ marginBottom: 'var(--space-4)' }}>
                    <AlertCircle size={16} />
                    <span>{saveError}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="full-name">
                        Full Name
                      </label>
                      <input
                        id="full-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="email-addr">
                        Email Address
                      </label>
                      <input
                        id="email-addr"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="username-fld">
                        Username
                      </label>
                      <div style={{ position: 'relative' }}>
                        <AtSign
                          size={14}
                          style={{
                            position: 'absolute',
                            left: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-secondary)',
                          }}
                        />
                        <input
                          id="username-fld"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled={!isEditing}
                          className="form-input"
                          style={{ paddingLeft: '2.2rem' }}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="org-fld">
                        Organization / Affiliation
                      </label>
                      <input
                        id="org-fld"
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        disabled={!isEditing}
                        placeholder="e.g., Cloud Infrastructure Team"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div
                      style={{
                        display: 'flex',
                        gap: 'var(--space-2)',
                        marginTop: 'var(--space-6)',
                        paddingTop: 'var(--space-4)',
                        borderTop: '1px solid var(--border-subtle)',
                      }}
                    >
                      <button type="submit" className="btn btn-primary">
                        <Save size={15} />
                        <span>Save Changes</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* TAB 2: Repository History */}
            {activeTab === 'history' && (
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    <Clock size={18} color="var(--accent-amber-dark)" />
                    <span>Search History ({history.length})</span>
                  </div>
                  {history.length > 0 && (
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      className="btn btn-outline btn-sm"
                    >
                      <RotateCcw size={13} />
                      <span>Clear All History</span>
                    </button>
                  )}
                </div>

                {showClearConfirm && (
                  <div
                    className="alert alert-warning"
                    style={{ marginBottom: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>Clear all repository search history for your account?</span>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button
                        onClick={() => {
                          clearHistory();
                          setShowClearConfirm(false);
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        Confirm Clear
                      </button>
                      <button
                        onClick={() => setShowClearConfirm(false)}
                        className="btn btn-outline btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {history.length > 0 && (
                  <div style={{ marginBottom: 'var(--space-4)', maxWidth: '380px' }}>
                    <div style={{ position: 'relative' }}>
                      <Search
                        size={15}
                        style={{
                          position: 'absolute',
                          left: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--text-secondary)',
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Filter search history..."
                        value={historyFilter}
                        onChange={(e) => setHistoryFilter(e.target.value)}
                        className="form-input"
                        style={{ paddingLeft: '2.2rem', fontSize: 'var(--text-xs)' }}
                      />
                    </div>
                  </div>
                )}

                {history.length === 0 ? (
                  <EmptyState
                    icon={<Clock size={22} />}
                    title="Your repository search history will appear here."
                    description="No repositories searched yet. Begin by querying a public repository in the assessment module."
                    action={
                      <Link to="/assess" className="btn btn-primary btn-sm">
                        Start an Assessment
                      </Link>
                    }
                  />
                ) : filteredHistory.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    No search records match "{historyFilter}".
                  </div>
                ) : (
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Repository</th>
                          <th>URL</th>
                          <th>Searched</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredHistory.map((item) => {
                          const isSaved = checkIsSaved(item.owner, item.repositoryName);
                          return (
                            <tr key={item.id}>
                              <td>
                                <div style={{ fontWeight: 600, color: 'var(--navy-950)' }}>
                                  {item.repositoryName}
                                </div>
                                <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                                  {item.owner}
                                </div>
                              </td>
                              <td>
                                <a
                                  href={item.repositoryUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    fontSize: 'var(--text-xs)',
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                  }}
                                >
                                  <span>{item.repositoryUrl}</span>
                                  <ExternalLink size={11} />
                                </a>
                              </td>
                              <td style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                                {new Date(item.searchedAt).toLocaleDateString()}
                              </td>
                              <td>
                                <StatusBadge status={item.status} size="sm" />
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
                                  <Link
                                    to={`/assess?repo=${encodeURIComponent(item.repositoryUrl)}`}
                                    className="btn btn-outline btn-sm"
                                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                                  >
                                    Assess
                                  </Link>
                                  <button
                                    onClick={() =>
                                      toggleBookmark({
                                        owner: item.owner,
                                        repositoryName: item.repositoryName,
                                        repositoryUrl: item.repositoryUrl,
                                        status: item.status,
                                        description: item.description,
                                        language: item.language,
                                      })
                                    }
                                    className={`btn ${isSaved ? 'btn-secondary' : 'btn-outline'} btn-sm btn-icon`}
                                    title={isSaved ? 'Remove from saved' : 'Save repository'}
                                    style={{ padding: '0.3rem' }}
                                  >
                                    {isSaved ? (
                                      <BookmarkCheck size={13} color="var(--accent-amber)" />
                                    ) : (
                                      <Bookmark size={13} />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => deleteHistoryItem(item.id)}
                                    className="btn btn-danger btn-sm btn-icon"
                                    title="Delete entry"
                                    style={{ padding: '0.3rem' }}
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Saved Repositories */}
            {activeTab === 'saved' && (
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    <Bookmark size={18} color="var(--accent-amber-dark)" />
                    <span>Saved Repositories ({savedRepos.length})</span>
                  </div>
                </div>

                {savedRepos.length > 0 && (
                  <div style={{ marginBottom: 'var(--space-4)', maxWidth: '380px' }}>
                    <div style={{ position: 'relative' }}>
                      <Search
                        size={15}
                        style={{
                          position: 'absolute',
                          left: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--text-secondary)',
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Filter saved repositories..."
                        value={savedFilter}
                        onChange={(e) => setSavedFilter(e.target.value)}
                        className="form-input"
                        style={{ paddingLeft: '2.2rem', fontSize: 'var(--text-xs)' }}
                      />
                    </div>
                  </div>
                )}

                {savedRepos.length === 0 ? (
                  <EmptyState
                    icon={<Bookmark size={22} />}
                    title="You haven't saved any repositories yet."
                    description="When evaluating public repositories, select 'Save' to bookmark them in your profile."
                    action={
                      <Link to="/assess" className="btn btn-primary btn-sm">
                        Start an Assessment
                      </Link>
                    }
                  />
                ) : filteredSaved.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    No saved repositories match "{savedFilter}".
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                    {filteredSaved.map((item) => (
                      <div
                        key={item.id}
                        className="card card-interactive"
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'var(--space-4)' }}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                            <div>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                                {item.owner}
                              </div>
                              <Link
                                to={`/assess?repo=${encodeURIComponent(item.repositoryUrl)}`}
                                style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--navy-950)', textDecoration: 'none' }}
                              >
                                {item.repositoryName}
                              </Link>
                            </div>
                            <StatusBadge status={item.status} size="sm" />
                          </div>
                          <a
                            href={item.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: 'var(--text-xs)',
                              color: 'var(--text-secondary)',
                              textDecoration: 'none',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            <span>{item.repositoryUrl}</span>
                            <ExternalLink size={10} />
                          </a>
                        </div>

                        <div
                          style={{
                            marginTop: 'var(--space-4)',
                            paddingTop: 'var(--space-3)',
                            borderTop: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            Saved {new Date(item.savedAt).toLocaleDateString()}
                          </span>
                          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                            <Link
                              to={`/assess?repo=${encodeURIComponent(item.repositoryUrl)}`}
                              className="btn btn-outline btn-sm"
                              style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                            >
                              Assess
                            </Link>
                            <button
                              onClick={() => deleteSavedRepo(item.id)}
                              className="btn btn-danger btn-sm btn-icon"
                              title="Remove from saved"
                              style={{ padding: '0.3rem' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Account & Security */}
            {activeTab === 'account' && (
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    <Shield size={18} color="var(--accent-amber-dark)" />
                    <span>Account Security</span>
                  </div>
                </div>

                {passwordSuccess && (
                  <div className="alert alert-success" style={{ marginBottom: 'var(--space-4)' }}>
                    <CheckCircle2 size={16} />
                    <span>Password successfully updated.</span>
                  </div>
                )}

                {passwordError && (
                  <div className="alert alert-error" style={{ marginBottom: 'var(--space-4)' }}>
                    <AlertCircle size={16} />
                    <span>{passwordError}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} style={{ maxWidth: '440px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="current-pw">
                      Current Password
                    </label>
                    <input
                      id="current-pw"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="form-input"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="new-pw">
                      New Password
                    </label>
                    <input
                      id="new-pw"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="form-input"
                      placeholder="At least 8 characters"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="confirm-new-pw">
                      Confirm New Password
                    </label>
                    <input
                      id="confirm-new-pw"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-input"
                      placeholder="••••••••"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
                    Update Password
                  </button>
                </form>

                <div
                  style={{
                    marginTop: 'var(--space-8)',
                    paddingTop: 'var(--space-6)',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                    <KeyRound size={14} />
                    <span>Active Auth Engine: {authMode.toUpperCase()} Mode</span>
                  </div>

                  <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--color-error)', marginBottom: 'var(--space-2)' }}>
                    Session Termination
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                    Terminate the active workspace session on this client device.
                  </p>
                  <button onClick={handleSignOut} className="btn btn-danger btn-sm">
                    <LogOut size={14} />
                    <span>Sign Out of Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
