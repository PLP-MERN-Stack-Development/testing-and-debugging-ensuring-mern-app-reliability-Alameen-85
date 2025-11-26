cat > tests / __mocks__ / mongoose.js << 'EOF'
module.exports = {
    connect: jest.fn(() => Promise.resolve()),
    Schema: jest.fn(() => ({
        pre: jest.fn(),
        post: jest.fn(),
    })),
    model: jest.fn(() => ({
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        save: jest.fn(),
    })),
    Types: {
        ObjectId: jest.fn()
    }
};
EOF